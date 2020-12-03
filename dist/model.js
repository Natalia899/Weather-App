class DataManager {

    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get('/cities')
        this.cityData = data
    }

    async getCityData(cityName) {
        let newCity = await $.get(`/city/${cityName}`)
        this.cityData.push(newCity)
        console.log(this.cityData)
        return newCity
    }

    saveCity(cityName) {
        let relCity = this.cityData.find(city => city.name === cityName)
        $.post(`/city`, relCity, (data => console.log(data)))
    }

    async removeCity(cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function (result) {
            }
        });
    }
}