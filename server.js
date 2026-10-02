// const { rejects } = require('assert');
// const { resolve } = require('dns');
// const express = require('express');
// const fs = require('fs/promises');
// const path = requie('path');
// const cache={}

// const app = express();
// const port = 3002
// const pathToFile = path.join(__dirname,"db.json");

// async function readFile(){
//     try{
//         let data = await Fs.readFile(pathToFile, "utf-8");
//         return JSON.parse(data);
//     }catch(err){
//         console.log(err);
//     }
   
// }

// async function readFileWithDelay(){
//     try{
//         await new Promise((resolve,reject) => { 
//             setTimeout(resolve,1500);
//         })

//         let data = await readFile();
//         return data;
//     }catch(err){
//         console.log(err);
//     }
    
// }

// app.get('/products', async(req, res) => {

//     try{
//         let key=req.url;
//         let value=cache[key];
//         if(value){
//             res.set("X-Cache","HIT")
//             return res.json(value)
//         }

//         // /key = /products, value={/products:[]}


//         let products = await readFileWithDelay();
//         cache[kay]=products;
//         res.set("X-Cache","MISS")
//         return res.json('products')
//     }catch(err){
//         res.status(500).send("Server error");
//     }
   
// })


// app.get('/products/:id', async(req, res) => {
//     try{
        
//         let {id} = req.params;
//         id=Number(id);
//         let products = await readFile();
//         let product=products.find((item)=>{
//             return item.id===id;
//         });
//         res.json('products')
//     }catch(err){
//         res.status(500).send("Server error");
//     }
   
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })






const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

const port = 3002;

app.use(express.json());

app.use("/", productRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});