const APIkey = "4d32bfe2b7f2d69ea5aa474a9f55742c"
// Variable for current day in 01/01/2022 format
const day = dayjs().format("MM/DD/YYYY")

let visibility;
// If there are items in the local storage "searches" it will append them in the search history on page load
if(localStorage.getItem("searches") != null){

    let searchHistory = localStorage.getItem("searches")
    
    $("#citySearches").append(searchHistory)

    console.log(searchHistory)

}
// Main function
function setWeather(city){
// Current day weather URL
let weatherURLToday = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`
// Five day forecast URL
let weatherURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`
// Clears the current weather and forecast weather so nothing collides
    $("#currentWeather").empty();
    $("#forecasts").empty();
// Fetches the current day weather data and parses it
fetch(weatherURLToday)
.then(function (response) {
    return response.json()
})//Passes the response in to the function, as data
.then(function (data) {
    console.log(data)

// Checks to see what the weather is and assigns the correct icon
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

// Creates the search history button element
    let cityNameButton =`<button class="cityBtn" value="${data.name}">${data.name}</button>`
// Appends the button
        $("#citySearches").append(cityNameButton);

        let allSearches = []
// If localStorage "searches" has content it will be executed differently than if it is empty. TO avoid a null entry
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

 
    
// Current weather information element
    let todaysInfo =

    `
    <h2>${data.name} <span>${day}</span> <img src="${visibility}"></h2>
        <p>Temp: ${data.main.temp} °F</p>
        <p>Wind: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `
    $("#currentWeather").append(todaysInfo)


    visibility = "";

})
// Fetches the five day forecast and handles it like the same day weather
fetch(weatherURLForecast)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data)


    let dayCount = 1;
// Loops through at a specific interval, to get the weather for every day at 12 noon.
for (var i = 4; i < 37; i += 8){
    // Day formatted so that we can use the daycount variable to add another day every loop, and give us five days in a row
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
// Single forecast card element
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
    // Appends the card
    $("#forecasts").append(forecastInfo)
// Adds a day to the 
    dayCount += 1;
    visibility = "";
}

})
// Clears the input field
    $("#cityInput").val("")
}

// Runs the setWeather function with the value of the buttons city name, passing it in to the function
$(".cityBtn").on("click", function(){
    city = $(this).attr("value");
    
    setWeather(city)
})

// Runs the setWeather function, with the input field value passed in to the function
$("#searchBtn").on("click", function(){
    city = $("#cityInput").val();

    setWeather(city)
})
// Clears the "searches" local storage and the search history div
$(".clearButton").on("click", function(){
    localStorage.clear("searches")
    $("#citySearches").empty()
})
