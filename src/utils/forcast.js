const request = require('request');

const forecast = (latitude , longitude , callback) => {
const url = 'https://api.darksky.net/forecast/a6f715e4f759885fd1581f17a83c3f61/' + latitude + ',' + longitude;
   
 request({url , json: true} , (error , {body}) => {
     if(error){
        callback('Unable to connect to weather service!!' , undefined)
     }
     else if(body.error){
          callback('Unable to find location' , undefined);
     }
     else{
         callback(undefined , 'It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + '% chance of rain.')
     }
 })
}

module.exports = forecast