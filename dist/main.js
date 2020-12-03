const manager = new DataManager()
const render = new Renderer()

const loadPage = async () => {
    await manager.getDataFromDB()
    render.renderData(manager.cityData)
}
loadPage()

$('#get').on('click', async () => {
    let cityName = $('#cityName').val()
    let data = await manager.getCityData(cityName)
    render.renderData(manager.cityData)
})

$('.city-container').on('click', '.save', function () {
    const cityName = $(this).closest('.city').find('.name').text()
    manager.saveCity(cityName)
})

$('.city-container').on('click', '.remove', async function () {
    const cityName = $(this).closest('.city').find('.name').text()
    console.log(cityName);
    await manager.removeCity(cityName)
    await manager.getDataFromDB()
    render.renderData(manager.cityData)
})
