import express from "express";
import { productRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080;

app.listen(port,()=>console.log(`Server on listening on port ${port}`));

//midlewares
app.use(express.json());

//routes
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);




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