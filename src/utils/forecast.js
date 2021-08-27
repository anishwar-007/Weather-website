const request = require('request');


const forecast = (longitude , latitude , callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=a6126e720ba9b028e39a9f16236730b5&query='+ longitude +','+ latitude ;
    
    request({url, json:true} , (error, {body} ) => {
        if(error){
           callback('Unable to connect to weather API' , undefined);
        }else if(body.error){
            console.log('Unable to find the location' , undefined);
        } else{
            // console.log(location);
            callback(undefined , body.current.weather_descriptions[0] +" The temperature is " + body.current.temperature + " but it feels like " + body.current.feelslike)
        }
    })
}

module.exports = forecast;