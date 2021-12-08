const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const { request } = require('http')

const app= express()

// nodemon src/app.js -e js,hbs
// Define paths for 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join('__dirname,','../templates/views')
const partialsPath = path.join('__dirname,','../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index.hbs'); 
})


app.get('/products',(req,res)=>{
    if(!req.query.search || req.query.search === undefined){
        res.send({
            error:'You must provide a search term. E.g search=football'
        })
    }
 
    res.render('products.hbs'); 
})


app.get('*',(req,res)=>{
   res.status(404).render('404.hbs')
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})

