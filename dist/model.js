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
        //console.log(cityName);
        //console.log(this.cityData);

        // this.cityData.forEach((city) => {
        //     if(city.name === cityName){
        //        // console.log('i did it!!!!');
        //        return $.post(`/city`, city)
        //     }
        // })
        let relCity = this.cityData.find(city => city.name === cityName)
       // console.log(relCity);
         $.post(`/city`, relCity, (data => console.log(data)))
    }

  async  removeCity(cityName) {
      await  $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function (result) {
                console.log(this.cityData);
                console.log(result);
                // this.cityData.find(city => result.name === city.name).remove()
                // console.log(result);
            }
        });
    }
}