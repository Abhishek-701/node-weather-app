const request = require('request')

const forecast = (address, callback) => {

    url = 'http://api.weatherstack.com/current?access_key=c2912bd923031ddb6fb88d4313da5548&query=' + address

    request({url : url , json : true }, (error,response)=> {
        if(error){
            callback('Unable to connect to service', undefined)
        }else{
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out. It feels like '+ response.body.current.feelslike + ' degrees')
        }
    })

}

module.exports = forecast