const express = require('express')
const router = express.Router()
const City = require('../models/city')
const axios = require('axios')

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
    res.send(addCity)
})

router.delete('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    let deleteCity = await City.findOneAndDelete({ name: cityName })
    res.send(deleteCity)
})

router.put('/city/:cityName', async (req, res) => {
    const { cityName } = req.params
    const update = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=edbe3adfc1cea67246077a9493f1ea44`)
    const updatedCity = await City.findOneAndUpdate({ name: update.data.name }, {
        $set: {
            temperature: Math.floor(update.data.main.temp - 273.15),
            condition: update.data.weather[0].description,
            conditionPic: `http://openweathermap.org/img/wn/${update.data.weather[0].icon}@2x.png`
        }
    },
        { useFindAndModify: false })

    const updatedDb = await City.find({ name: updatedCity.name })
    console.log(updatedDb);
    res.send(updatedDb)
})

module.exports = router