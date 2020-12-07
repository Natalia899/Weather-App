const manager = new DataManager()
const render = new Renderer()

const loadPage = async () => {
    await manager.getDataFromDB()
    render.renderData(manager.cityData)
}
loadPage()

$('#get').on('click', async () => {
    const cityName = $('#cityName').val()
    const data = await manager.getCityData(cityName)
    render.renderData(manager.cityData)
})

$('.city-container').on('click', '.save', function () {
    const cityName = $(this).closest('.city').find('.name').text()
    manager.saveCity(cityName)
})

$('.city-container').on('click', '.remove', async function () {
    const cityName = $(this).closest('.city').find('.name').text()
    await manager.removeCity(cityName)
    await manager.getDataFromDB()
    render.renderData(manager.cityData)
})

$('.city-container').on('click', '.refresh', function () {
    const cityName = $(this).closest('.city').find('.name').text()
    manager.updateCity(cityName)
})




//Extension2 (not finished)
// const successCallback = function (postion){
// 	console.log(postion)
// }
// const errorCallback = function (postion){
// 	console.log(postion)
// }

// const geolocation = function(successCallback, errorCallback){
// 	navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
// }

// geolocation(successCallback, errorCallback)


