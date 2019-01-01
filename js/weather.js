/// Simple weather app js


let city, state, cel, lat, long;
let coordinates = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"(' + lat + ',' + long + ')")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

let conditions = document.getElementById('conditions');
let fah = document.getElementById('fah');
let cityname = document.querySelector('#cityname');
let statename = document.querySelector('#statename');
let getconditions = document.getElementById('getconditions');
let sunrisetime = document.getElementById('sunrise');
let humidityDisp = document.querySelector('#humidity');
let sunsettime = document.querySelector('#sunset');
let userlocation = document.getElementById('geolocation');
let greeting;
function greet() {
    let today = new Date();
    let hourNow = today.getHours();
    
    if (hourNow > 19) {
        greeting = 'Good evening';
    }else if (hourNow > 12) {
        greeting = 'Good afternoon';
    }else if (hourNow > 0) {
        greeting = 'Good morning';
    }else{
        greeting = 'Welcome';
    }
}
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        userlocation.innerText = 'Geolocation is not supported by this browser.';
    }
}
function showPosition(position) {
    lat = position.coords.latitude.toFixed(7);
    long = position.coords.longitude.toFixed(7);
    greet();
    userlocation.innerText = greeting + city; //'Latitude: ' + position.coords.latitude.toFixed(7) + '\n' + 'Longtitude: ' + position.coords.longitude.toFixed(7);
    let coordinates = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"(' + lat + ',' + long + ')")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    
    fetch(coordinates)
    .then(function(response) {
        return response.json().then(function(data){
            return data.query.results;
        })
        .then(fetchInfo)
    })
    console.log(lat, long);
}
getLocation();
function getWeather(city, state) {
    url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%2C%20' + state + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    fetch(url)
        .then(handleErrors)
        .then(parseJson)
        .then(fetchInfo)
        .catch(function (err) {
            console.log(err);
            alert('Please enter valid city and state name!' + '\n' + 'e.g. New York, NY' + '\n' + 'or' + '\n' + 'Istanbul, TR')
            console.log('Something went wrong!')
        })
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}
function parseJson(response) {
    //console.log(response)
    return response.json().then(function (data) {
        return data.query.results;
    });
}
function fetchInfo(data) {
    let sunrise = data.channel.astronomy.sunrise;
    let sunset = data.channel.astronomy.sunset;
    let humidity = data.channel.atmosphere.humidity;
    let title = data.channel.item.title;
    let temperature = data.channel.item.condition.temp;
    let sunny = data.channel.item.condition.text;
    let sunrisePart1 = sunrise.slice(2, 4);
    let sunsetPart1 = sunset.slice(2,4);
    // Fix time format for sunset
    if (sunrisePart1 < 10) {
        console.log(sunrise.slice(0, 2) + '0' + sunrisePart1 + sunrise.slice(4));
        sunrisetime.innerText = 'Sunrise: ' + sunrise.slice(0, 2) + '0' + sunrisePart1 + sunrise.slice(4); // Sunrise time
    }else{
        console.log(sunrise);
        sunrisetime.innerText = 'Sunrise: ' + sunrise;
    }
    if (sunsetPart1 < 10) {
        console.log(sunset.slice(0,2) + '0' + sunsetPart1 + sunset.slice(4));
        sunsettime.innerText = 'Sunset: ' + sunset.slice(0, 2) + '0' + sunsetPart1 + sunset.slice(4); // Sunset time
    }else{
        console.log(sunset);
        sunsettime.innerText = 'Sunset: ' + sunset;
    }
    fah.innerText = 'Temperature: \xB0' + temperature + ', ' + sunny; // Temperature and type
    conditions.innerText = 'Weather ' + title; // Conditions location info and local time
    humidityDisp.innerText = 'Humidity: ' + humidity;
    //console.log(data.channel.atmosphere.humidity);
    //console.log(data.channel)
}

getconditions.onclick = function () {
    city = cityname.value;
    state = statename.value;
    getWeather(city, state);
}
//getWeather();
