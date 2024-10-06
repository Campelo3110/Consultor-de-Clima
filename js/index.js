const search = document.querySelector(".search-box button")

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather()
    }
})

search.addEventListener("click", function() {
    getWeather()
})

function getWeather() {
    const container = document.querySelector(".container")
    const weatherBox = document.querySelector(".weather-box")
    const weatherDetailes = document.querySelector(".weather-details")
    const erroe404 = document.querySelector(".not-found")

    const APIKey = "c330e2d72b04eb811971e8210d0685f6"
    const city = document.querySelector(".search-box input").value

    if (city == '')
        return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    
    .then(response => response.json())
    .then(json => {
        if(json.cod === "404"){
            container.style.height = "400px"
            weatherBox.style.display = "none"
            weatherDetailes.style.display = "none"
            erroe404.style.display = "block"
            erroe404.classList.add("fadeIn")
            return
        }

        erroe404.style.display = "none"
        erroe404.classList.remove("fadeIn")

        const image = document.querySelector(".weather-box img")
        const temperature = document.querySelector(".weather-box .temperature")
        const description = document.querySelector(".weather-box .description")
        const humidity = document.querySelector(".weather-details .humidity span")
        const wind = document.querySelector(".weather-details .wind span")

        switch (json.weather[0].main){
            case "Clear":
                image.src = "./img/clear.png"
                break;
            case "Rain":
                image.src = "./img/rain.png"
                break;
            case "Snow":
                image.src = "./img/snow.png"
                break;
            case "Clouds":
                image.src = "./img/cloud.png"
                break;
            case "Haze":
                image.src = "./img/mist.png"
                break;

            default:
                image.src = ""
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

        weatherBox.style.display = ""
        weatherDetailes.style.display = ""
        weatherBox.classList.add("fadeIn")
        container.style.height = "590px"
    })
}