const express = require('express')
const router = express.Router()
const City = require('../models/city')
const axios = require('axios')
//const bodyParser = require('body-parser')
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({ extended: false }))

router.get('/city/:cityName', async (req, res) => {
    const {cityName} = req.params
    const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=edbe3adfc1cea67246077a9493f1ea44`)
    const upWeather = {
        name: weather.data.name,
        temperature: weather.data.main.temp-273.15,
        condition: weather.data.weather[0].description,
        conditionPic: 'don`t know'}
    res.send(upWeather)
})

router.get('/cities', async (req, res) => {
    let cities = await City.find({})
    req.send(cities)

    // This route should find all of the city data saved in your DB, and send it to the client
})

router.post('/city', async (req, res) => {
    let addCity = await new City (...req.body)
    console.log(addCity);
    addCity.save()
    // This route should save a new City to your DB
    res.send(addCity)
})

router.delete('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    let deleteCity = await City.findOneAndDelete({ name: cityName})
    // This route should take a cityName parameter and delete the correct city from your DB
    req.send(deleteCity)
})

module.exports = router