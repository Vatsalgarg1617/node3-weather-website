const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')
const path = require('path')
const express = require('express')
const hbs = require('hbs');

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

// Setup Handlebars engine and views locatoin
app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('' , (req , res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'Vatsal garg'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Vatsal Garg'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
       title: 'Help',
       name: 'vatsal'
    })
})

app.get('/weather' , (req , res) => {
      if(!req.query.address){
        return res.send({
            error: 'You must provide the Address !!!'
        })
      }


    geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
         if(error){
           return res.send({error})
         }

         forecast(latitude , longitude , (error , forecastData) => {
             if(error){
               return res.send({ error })
             }
             res.send({
                 forcast: forecastData,
                 location,
                 address: req.query.address
             })
         })
    })  
    
})



app.get('/products' , (req , res) => {
    if(!req.query.search){
       return res.send({
           error:'You must provide the search'
                      
       })
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    })
    
})

app.get('/help/*' , (req , res) => {
    res.render( '404', {
        msg:'Article Not found'
    });
})

app.get('*' , (req , res) => {
    res.render( '404', {
        msg:'404 not found'
    });
})

app.listen(3000 , () => {
    console.log('Server is up on port 3000')
})