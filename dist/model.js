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

    async saveCity(cityName) {
        let relCity = await this.cityData.find(city => city.name === cityName)
        $.post(`/city`, relCity)
    }

    async removeCity(cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function (result) {
            }
        });
    }

    async updateCity(cityName) {
        const newInfo = await $.ajax({
            url: `/city/${cityName}`,
            type: 'PUT',
            success: function (result) {
            }
        })
        let cityIndex = this.cityData.findIndex(i => i.name === cityName)
        this.cityData.splice(cityIndex, 1)
        this.cityData.push(newInfo[0])
    }
}