const express = require('express')
const router = express.Router()
const City = require('../models/city')
const axios = require('axios')
//const bodyParser = require('body-parser')
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({ extended: false }))

router.get('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=edbe3adfc1cea67246077a9493f1ea44`)
    const upWeather = {
        
        name: weather.data.name,
        temperature: Math.floor(weather.data.main.temp - 273.15),
        condition: weather.data.weather[0].description,
        conditionPic: `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`
    }
    res.send(upWeather)
})

router.get('/cities', async (req, res) => {
    let cities = await City.find({})
    res.send(cities)

})

router.post('/city', async (req, res) => {
    let addCity = new City({ ...req.body })
    await addCity.save()
    console.log('do u save????');
    res.send(addCity)
})

router.delete('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    let deleteCity = await City.findOneAndDelete({ name: cityName })
    res.send(deleteCity)
})

module.exports = router