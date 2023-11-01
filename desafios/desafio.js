const ProductManager = require('./productmanager');
const express=require('express')
const PORT=3009
const app=express()
const productos= new ProductManager()
app.get("/",(req,res)=>{
    res.send("<h2 style='color:blue;'>bienvenido, aqui podras realizar operaciones con productos!</h2>")
})
app.get('/products/:id',(req,res)=>{
    let id=parseInt(req.params.id)
    let prod=productos.getProductById(id)
    res.setHeader("content-type","text/plain")
    res.status(200).json({prod})
})

const server = app.listen(PORT, () => {
    console.log("server online")
  });
app.get('/products',(req,res)=>{
    let endpoint=parseInt(req.query.limit)
    if(isNaN(endpoint) || endpoint<=0){
        res.send(productos.GetProducts())
    }
    else if(endpoint>0){
        const products=productos.GetProducts().slice(0,endpoint)
        res.send(products)
    }
})
