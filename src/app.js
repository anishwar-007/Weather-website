const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//Define path for express config
 const PublicDirectoryPath = path.join(__dirname , '../public');
 const viewsPath = path.join(__dirname , '../templates/views');
 const partialsPath = path.join(__dirname , '../templates/partials');

 // Setup static directory to serve
 app.use(express.static(PublicDirectoryPath));

 // Set up handlebars engine and views location
 app.set('view engine' , 'hbs');
 app.set('views' , viewsPath);
 hbs.registerPartials(partialsPath);

 app.get('' , (req,res) =>{
     res.render('index' , {
         title : 'Weather App',
         name: 'Anishwar Sharma'
     });
 })
 app.get('/about' , (req,res) =>{
     res.render('about.hbs' , {
         title : 'Weather App',
         name: 'Anishwar Sharma'
     });
 })
 app.get('/help' , (req,res) =>{
     res.render('help.hbs' , {
         title : 'Help',
         name: 'Anishwar Sharma'
     });
 })
app.get('/weather' , (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

        geocode( req.query.address ,( error,{ latitude,longitude,location} ={} ) =>{
            if(error){
                return res.send({error})
           }
           forecast(latitude , longitude,(error,data) =>{
               if(error){
                return res.send({error})
               }
               res.send({
                forecast:data,
                location:location,
                address: req.query.address
            })
           })
       })
})

app.get('/help/*' , (req,res) =>{
    res.render('error.hbs' , {
        title: 'Helpdesk not found',
        name: 'Anishwar Sharma',
        errorMessage: 'Help page not found'
    })
})
app.get('*' , (req,res) =>{
    res.render('error.hbs' , {
        title: 'Helpdesk not found',
        name: 'Anishwar Sharma',
        errorMessage: 'Page not found'
    })
})

app.listen(3000 , () => {
    console.log('Server is up at port 3000');
})