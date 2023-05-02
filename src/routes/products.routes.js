import {Router} from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");
// console.log(productManager);

const router = Router();

router.get("/", async(req,res)=>{
  try {
      const limit = req.query.limit;
      const products = await productManager.getProducts(); // obtener la lista de productos
      if (limit) {
          res.json({ status: 'success', data: products.slice(0, limit) });
        } else {
          res.json({ status: 'success', data: products });
        }
  } catch (error) {
      res.status(400).json({status:"error", message:error.message});
  }
});

//trae producto solo por id
router.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del Servidor' });
  }
});



router.post("/", async(req,res)=>{
  try {
      const product = req.body;
      const newProduct = await productManager.addProduct(product);
      res.json({status:"success", data:newProduct});
  } catch (error) {
      res.status(400).json({status:"error", message:error.message});
  }
});


// actualizacion de producto existente
router.put('/:pid', async (req, res) => {
    try {
      const pid = Number(req.params.pid);
      console.log('pid:', pid);
      if (isNaN(pid)) {
        return res.status(400).json({ status: 'error', message: 'El ID del producto no es válido' });
      }
      const product = await productManager.getProductById(pid);
      if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      const { title, description, code, price, stock, category, thumbnails } = req.body;
      if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ status: 'error', message: 'Los campos no son válidos' });
      }
      product.title = title;
      product.description = description;
      product.code = code;
      product.price = price;
      product.stock = stock;
      product.category = category;
      product.thumbnails = thumbnails;
      const updatedProduct = await productManager.updateProduct(pid, product);
      res.json({ status: 'success', data: updatedProduct });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  });

//permite eliminar el producto con pid

router.delete('/:pid', async (req, res) => {
    try {
      const pid = Number(req.params.pid);
      console.log('pid:', pid);
      if (isNaN(pid)) {
        return res.status(400).json({ status: 'error', message: 'El ID del producto no es válido' });
      }
      const product = await productManager.getProductById(pid);
      if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      const deletedProduct = await productManager.deleteProduct(pid);
      res.json({ status: 'success', data: deletedProduct });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  });

  export{router as productRouter};

//   router.delete('/:pid', async (req, res) => {
//     try {
//       const pid = req.params.pid;
//       await productManager.deleteProduct(pid);
//       res.json({ status: 'success', message: `Producto con pid ${pid} eliminado` });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ status: 'error', message: 'Error del Servidor' });
//     }
//   });





//POSTMAN
//http://localhost:8080/api/products/
//http://localhost:8080/api/products/?limit=2
//http://localhost:8080/api/products/2
//http://localhost:8080/api/products/1