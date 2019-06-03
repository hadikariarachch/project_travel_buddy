let request = require('request');

class WeatherClass {

getWeather(city, callback) {
    let appId = "bb173c2a165dcfc19a3cd5d122820a7c";
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=' + appId;

    //sending a request to the external API
    request(url, function (error, res, body) {
        if (error) {            
            console.log("ERROR FROM weatherInformation.js : "+ error);            
            return error; 
        } else {

            let response = JSON.parse(body);
            return callback(JSON.stringify(response)); 
        }
    });       
}

}
module.exports.Weather = new WeatherClass();