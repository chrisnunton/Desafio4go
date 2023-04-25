// id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)
//status:Boolean
//category

import fs from "fs";
import path from "path";
import { __dirname } from "../utils.js";

class ProductManager{
    constructor(pathName){
        this.path=path.join(__dirname,`/files/${pathName}`);
    }

    fileExists(){
        return fs.existsSync(this.path);
    };

    generateId(products){
        let newId;
        if(!products.length){
            newId=1;
        } else{
            newId=products[products.length-1].id+1;
        }
        return newId;
    }

    async addProduct(product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productId = this.generateId(products);
                product.id = productId;
                // console.log("product: ", product);
                products.push(product);
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                return product;
            } else {
                const productId = this.generateId([]);
                product.id = productId;
                // console.log("product: ", product);
                await fs.promises.writeFile(this.path,JSON.stringify([product],null,2));
                return product;
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async getProducts(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                return products;
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async getProductById(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const product = products.find(item=>item.id === parseInt(id));
                if(product){
                    return product;
                } else {
                    return null;
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async updateProduct(id,product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(item=>item.id === id);
                if(productIndex>=0){
                    products[productIndex]={
                        ...products[productIndex],
                        ...product
                    }
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return `El producto con el id ${id} fue modificado`;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };



    async deleteProduct(id){
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
    
                const productIndex = products.findIndex(item => item.id == id);
                if (productIndex >= 0) {
                    products.splice(productIndex, 1);
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    return `El producto con el id ${id} fue eliminado`;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export {ProductManager}











// //const fs=require("fs");
// import fs from 'fs';


// export class ProductManager{
//     constructor(pathName){
//         this.path=pathName;
//     }
//     //funcion para saber si el archivo existe
//     fileExists(){
//       return  fs.existsSync(this.path); //true si existe, false si no 
//     }
//     //funcion para generar el id
//     generateId(products){
//         let newId;
//         if(!products.length){//arreglo vacio
//             newId=1;
//         } else{
//             newId=products[products.length-1].id+1;
//         }
//         return newId;
//     }

//     async addProduct(product){
//         try {
//             if(this.fileExists()){
//                 const content= await fs.promises.readFile(this.path,"utf-8");//leemos el contenido del arhivo
//                 const products= JSON.parse(content);
//                 const productId=this.generateId(products);
                
//                 const existingProduct = products.find(p => p.title === product.title);
//                 if (existingProduct) {
//                   throw new Error(`Ya existe un producto con el título ${product.title}`);
//                 }
        
//                 product.id=productId;
//                 //console.log("product: ", product);
//                 products.push(product);
//                 await fs.promises.writeFile(this.path,JSON.stringify(products, null,2));
//                 return product;
//             }else{
//                 const productId=this.generateId([]);
//                 product.id=productId;
//                 //console.log("product: ", product);
//                 await fs.promises.writeFile(this.path,JSON.stringify([product], null,2));
//                 return product;
//             }
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async getProducts(){
//         try {
//             if(this.fileExists()){
//                 const content= await fs.promises.readFile(this.path,"utf-8");
//                 const products= JSON.parse(content);
//                 return products;
//             }else{
//                 throw new Error("El archivo no existe");
//             }
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
//     async getProductById(id){
//         try {
//             if(this.fileExists()){
//                 const content= await fs.promises.readFile(this.path,"utf-8");
//                 const products= JSON.parse(content);
//                 const product=products.find(item=>item.id==id);
//                 if(product){
//                     return product;
//                 }else{
//                     throw new Error(`El producto con el id ${id} no existe`);
//                 }
//             }else{
//                throw new Error("El archivo no existe");
//             }
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async updateProduct(id,product){
//         try {
//             if(this.fileExists()){
//                 const content= await fs.promises.readFile(this.path,"utf-8");//leemos el contenido del arhivo
//                 const products= JSON.parse(content);
//                 const productIndex=products.findIndex(item=>item.id==id);
//                 if(productIndex>=0){
//                     products[productIndex]={
//                         ...products[productIndex],
//                         ...product
//                     }
//                     await fs.promises.writeFile(this.path,JSON.stringify(products, null,2));
//                 return `El producto con el id ${id} fue modificado`;
//                     return product;
//                 }else{
//                     throw new Error(`El producto con el id ${id} no existe`);
//                 }
//             }else{
//                throw new Error("El archivo no existe");
//             }
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
    
    // async deleteProduct(id){
    //     try {
    //         if (this.fileExists()) {
    //             const content = await fs.promises.readFile(this.path, "utf-8");
    //             const products = JSON.parse(content);
    
    //             const productIndex = products.findIndex(item => item.id == id);
    //             if (productIndex >= 0) {
    //                 products.splice(productIndex, 1);
    //                 await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    //                 return `El producto con el id ${id} fue eliminado`;
    //             } else {
    //                 throw new Error(`El producto con el id ${id} no existe`);
    //             }
    //         } else {
    //             throw new Error("El archivo no existe");
    //         }
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

// }

// //utilizar la clase
// const manager= new ProductManager("./products.json");

// //Esta funcion sirve para llamar a los metodos de la clase
// const funcionPrincipal=async()=>{
//     try {
//         const productAdded=await manager.addProduct({title:"barco",price:6500});
//         const productAdded1=await manager.addProduct({title:"carrito",price:500});
//         console.log("productAdded: ", productAdded);
//          const product1=await manager.getProductById(2);
//         //  console.log("product1 ", product1);
//         //  const resultado=await manager.updateProduct(2,{price:1600});
//         //  console.log("resultado:",resultado);
//         // //obtenerProductos
//         // const TodoslosProductos= await manager.getProducts();
//         // console.log("TodoslosProductos:", TodoslosProductos);
//         // //eliminarProductos
//         // const eliminarProducto = await manager.deleteProduct(2);
//         // console.log("eliminarProducto:", eliminarProducto);

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// funcionPrincipal();