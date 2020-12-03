const manager = new DataManager()
const render = new Renderer()

const loadPage = async () => {
    await manager.getDataFromDB()
    //console.log(manager.cityData);
    render.renderData(manager.cityData)
}
loadPage()

$('#get').on('click', async ()=>{
    let cityName = $('#cityName').val()
   let data =  await manager.getCityData(cityName)
  // console.log(manager.cityData);
    render.renderData(manager.cityData)
})

$('#getFromDB').on('click', async () => {
    let cities = await manager.getDataFromDB()
   // console.log(cities);
})


Handlebars.registerHelper('clickHelper', function(city) {
	return city
});

const onCityClick = (city) => {
    let cityName = city.name
    console.log(cityName);
    console.log('do u know cityName?');
    manager.saveCity(cityName)
};



// $('.save').on('click', ()=> {
//     let cityName = $(this).closest(".city").find(".name").text()
//     console.log(cityName);
//     console.log('do u know cityName?');
//     manager.saveCity(cityName)
// }
// )

$('.remove').on('click', ()=>{
    let cityName = $('#cityName').val()
    manager.removeCity(cityName)
    //console.log('deleted');
})