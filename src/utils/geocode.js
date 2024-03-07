const request = require('request')

const geocode = (address, callback) => {

    new_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJoaXNoZWs3MDEiLCJhIjoiY2x0MzEzdmdvMTRwODJucnpkNGNhZ2FzbCJ9.a5mSZf-MdyaPHedjaKNo1g&limit=1'

    request({url: new_url, json: true}, (error, response)=> {

        if(error){
            callback('Unable to reach service', undefined)
        }else if (response.body.features.length === 0){
            callback('Location not found', undefined)
        }else{
             callback(undefined, {
                // latitude : response.body.features[0].center[1],
                // longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
             })
        }
    
           
    })  
}

module.exports = geocode