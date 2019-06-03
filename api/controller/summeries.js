let request = require('request');

class PlaceSummery {

  makeFirstLetterCapital(str){

        str = str.split(" ");
    
        for (let i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
    
        return str.join(" ");
  }

  getDetails(keyword, callback) {

    keyword = new PlaceSummery().makeFirstLetterCapital(keyword); //make the first letter capitol of each word to use the wikipedia api correctly
   
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + keyword;

    var title = "";
    var originalImage = "";
    var description = ""; 
    var coordinates = "";
    var webResourceUrl= ""; 
    var mobileResourceUrl= ""; 
    var summery = "";
    var summeryInHtml = "";

    var result = {
        title: title, 
        originalImage: originalImage, 
        description: description, 
        coordinates: coordinates, 
        webResourceUrl: webResourceUrl,
        mobileResourceUrl: mobileResourceUrl,
        summery: summery,
        summeryInHtml: summeryInHtml
    };

    //sending a request to the external API
    request(url, function (error, res, body) {
        if (error) {
            console.log("ERROR FROM summery.js : "+ error);
            
            result.title = 'Summery error';
            result.originalImage = 'Summery error';
            result.description = 'Summery error';
            result.coordinates = 'Summery error';
            result.webResourceUrl = 'Summery error';
            result.mobileResourceUrl = 'Summery error';
            result.summery = 'Summery error';
            result.summeryInHtml = 'Summery error';
            
            return callback(JSON.stringify(result)); 
        } else {

            let response = JSON.parse(body); 

            if("title" in response) {                    
                result.title = response.title;                                                       
            }else {
                result.title = 'No title found';
            }

            if("originalimage" in response) {
                if ("source" in response.originalimage) {
                    result.originalImage = response.originalimage["source"];     
                }                                                                    
            }else {
                result.originalImage = 'No image found';
            }

            if("description" in response) {                    
                result.description = response.description;                                                       
            }else {
                result.description = 'No description found';
            }  

            if("coordinates" in response) {                        
                result.coordinates = response.coordinates['lat'] +", "+ response.coordinates['lon'];                               
            }else {
                result.coordinates = 'No coordinates found'; 
            }

            if("content_urls" in response) {
                if ("desktop" in response.content_urls) {
                    result.webResourceUrl = response.content_urls.desktop['page'];
                }
                if ("mobile" in response.content_urls) {
                    result.mobileResourceUrl = response.content_urls.mobile['page'];
                }                                             
            }else {
                result.webResourceUrl = 'No webResourceUrl found';
                result.mobileResourceUrl = 'No webResourceUrl found';  
            }

            if("extract" in response) {                    
                result.summery = response.extract;                                                       
            }else {
                result.summery = 'No summery found';
            }

            if("extract_html" in response) {                    
                result.summeryInHtml = response.extract_html;                                                       
            }else {
                result.summeryInHtml = 'No summeryInHtml found';
            }

            return callback(JSON.stringify(result)); 
        }
    });       
}

}
module.exports.PlaceSummery = new PlaceSummery();