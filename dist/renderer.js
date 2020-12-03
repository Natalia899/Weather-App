class Renderer {
    renderData (allCityData) {
       // console.log('do you render?????????');
        //console.log(allCityData);
        const source = $('#weather-template').html()
        const template = Handlebars.compile(source)
        const data = template({allCityData})
        $('.city-container').empty().append(data)
    }
}