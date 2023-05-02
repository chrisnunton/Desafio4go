import express from "express";
import { productRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/carts.routes.js";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import { ProductManager } from "./managers/ProductManager.js";
import path from 'path';
const app = express();
const port = 8084;
const productManager = new ProductManager();

// Configuración de Handlebars como motor de plantillas
app.engine(
    "handlebars",
    exphbs({
      layoutsDir: path.join(__dirname, "views", "layouts"), // carpeta donde se encuentran los layouts
      partialsDir: path.join(__dirname, "views", "partials"), // carpeta donde se encuentran los partials
      defaultLayout: "main", // layout por defecto
      extname: ".handlebars", // extensión de los archivos de vistas
    })
  );
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views"));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configuración de WebSocket
const server = app.listen(port, () =>
  console.log(`Server on listening on port ${port}`)
);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Rutas
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Vista home
app.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    products: productManager.getProducts(),
  });
});



// import express from 'express';
// import { ProductManager } from './ProductManager.js';



// const app = express();
// const port = 3000;

// const productManager = new ProductManager('./products.json');

// app.get('/products', async (req, res) => {
//   try {
//     const limit = req.query.limit;
//     const products = await productManager.getProducts();
//     if (limit) {
//       res.json(products.slice(0, limit));
//     } else {
//       res.json(products);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error  del Servidor' });
//   }
// });


// app.get('/products/:pid', async (req, res) => {
//   try {
//     const pid = req.params.pid;
//     const product = await productManager.getProductById(pid);
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error  del Servidor'});
//   }
// });

// app.listen(port, () => {
//   console.log(`Este servidor se encucha en este puerto ${port}`);
// });

//http://localhost:3000/products
//http://localhost:3000/products/3