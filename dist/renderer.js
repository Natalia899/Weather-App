class Renderer {
    renderData(allCityData) {
        const source = $('#weather-template').html()
        const template = Handlebars.compile(source)
        const data = template({ allCityData })
        $('.city-container').empty().append(data)
    }
}