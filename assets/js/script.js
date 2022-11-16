const APIkey = "4d32bfe2b7f2d69ea5aa474a9f55742c"

const day = dayjs().format("MM/DD/YYYY")

let visibility;

if(localStorage.getItem("searches") != null){

    let searchHistory = localStorage.getItem("searches")
    
    $("#citySearches").append(searchHistory)

    console.log(searchHistory)

}

function setWeather(city){

let weatherURLToday = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`
let weatherURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`

    $("#currentWeather").empty();
    $("#forecasts").empty();

fetch(weatherURLToday)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log(data)

    let temperature = data.main.temp
    let windSpeed = data.wind.speed
    let humidity = data.main.humidity
    if(data.weather[0].main == "Clear"){
        if(dayjs().format("HH") < 6 || dayjs().format("HH") > 8){
            visibility = "./assets/images/clipart3046907.png"
        } else {
            visibility = "./assets/images/clipart562720.png"
        }
    } else if (data.weather[0].main == "Clouds"){
        visibility = "./assets/images/clouds.png"
    } else if (data.weather[0].main == "Fog") {
        visibility = "./assets/images/if-weather-30-2682821-90800.png "
    } else if (data.weather[0].main == "Rain"){
        visibility = "./assets/images/kindpng_762896.png"
    } else if (data.weather[0].main == "Snow"){
        visibility = "./assets/images/clipart1563013.png"
    }
     else {
        visibility = "./assets/images/icons8-thunderstorm-60.png"
    }


    let cityNameButton =`<button class="cityBtn" value="${data.name}">${data.name}</button>`

        $("#citySearches").append(cityNameButton);

        let allSearches = []

        if(localStorage.getItem("searches") != null){

            allSearches = localStorage.getItem("searches")
    
            allSearches += cityNameButton
    
            localStorage.setItem("searches", allSearches)
    
        console.log(localStorage.getItem("searches"))
            }
            
        if(localStorage.getItem("searches") == null){

            allSearches += cityNameButton
    
            localStorage.setItem("searches", allSearches)
    
            console.log(localStorage.getItem("searches"))
        } 

 
    

    let todaysInfo =

    `
    <h2>${data.name} <span>${day}</span> <img src="${visibility}"></h2>
        <p>Temp: ${temperature} °F</p>
        <p>Wind: ${windSpeed} MPH</p>
        <p>Humidity: ${humidity}%</p>
    `
    $("#currentWeather").append(todaysInfo)


    visibility = "";

})

fetch(weatherURLForecast)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data)


    let dayCount = 1;

for (var i = 4; i < 37; i += 8){
    let forecastDay = dayjs().add(dayCount, "day").format("MM/DD/YYYY")

    if(data.list[i].weather[0].main == "Clear"){
            visibility = "./assets/images/clipart562720.png"
    } else if (data.list[i].weather[0].main == "Clouds"){
        visibility = "./assets/images/clouds.png"
    } else if (data.list[i].weather[0].main == "Fog") {
        visibility = "./assets/images/if-weather-30-2682821-90800.png "
    } else if (data.list[i].weather[0].main == "Rain"){
        visibility = "./assets/images/kindpng_762896.png"
    } else if (data.list[i].weather[0].main == "Snow"){
        visibility = "./assets/images/clipart1563013.png"
    }
     else {
        visibility = "./assets/images/icons8-thunderstorm-60.png"
    }

    let forecastInfo = 
    `
    <div class="forecastCard">
        <h3>${forecastDay}</h3>
            <img src="${visibility}"/>
            <p>Temp: ${data.list[i].main.temp} °F</p>
            <p>Wind: ${data.list[i].wind.speed} MPH</p>
            <p>Humidity: ${data.list[i].main.humidity}%</p>
    </div>
    `
    $("#forecasts").append(forecastInfo)

    dayCount += 1;
    visibility = "";
}

})

    $("#cityInput").val("")
}


$(".cityBtn").on("click", function(){
    city = $(this).attr("value");
    
    setWeather(city)
})


$("#searchBtn").on("click", function(){
    city = $("#cityInput").val();

    setWeather(city)
})

$(".clearButton").on("click", function(){
    localStorage.clear("searches")
    $("#citySearches").empty()
})
