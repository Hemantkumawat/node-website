const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const { request } = require('http')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()
const port = process.env.PORT || 3000

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


app.get('/weather',(req,res)=>{
    res.render('weather.hbs'); 
})





app.get('/get-weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.status(404).render('404.hbs')
 })

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})
