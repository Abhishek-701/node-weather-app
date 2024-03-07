const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { error } = require('console')

const app = express()


const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index', {
        name: 'Abhishek',
        title: 'Weather'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help Page',
        example : "This is the example string"
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        name: 'Abhishek',
        title: 'About'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error : 'Please provide an Address'
        })  
    }

    geocode(req.query.address, (error, {location} ={})=> {
        if(error) {
            return res.send({ error })
        }

        forecast(location ,  (error , forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })

})


app.get('/help/*', (req,res)=> {
    res.render('error',{
        title: '404',
        error_message: 'Help not found'
    })
})

app.get('*', (req,res)=> {
    res.render('error',{
        title: '404',
        error_message: 'Page not found'
    })
})

app.listen(3000, ()=> {
    console.log("Server up on port 3000");
})
