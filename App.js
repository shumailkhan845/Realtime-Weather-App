const container = document.querySelector('.container');
const searchBox = document.querySelector('.search-box');
const imageContainer = document.querySelector('.imageContainer');
const conditionContainer = document.querySelector('.conditionContainer');
const searchBtn = document.querySelector('.bx-search');

searchBtn.addEventListener("click", () => {
    const apiKey = 'd0c50110e30a2a206bf862009c55b3b0';

    const city = document.querySelector('.search-box input');

    if (city.value.trim() === '') return; // Check actual input value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod !== 200) {
                alert("City not found");
                return;
            }

            const image = document.querySelector('.imageContainer img');
            const temperature = document.querySelector('#tempContainer');
            const weatherCondition = document.querySelector('#weatherCondition');
            const humidityContainer = document.querySelector('#humidity');
            const windContainer = document.querySelector('.wind-container span'); // Fixed selector

            // cityName.innerHTML = city.value.toUpperCase();
            city.value = '';

            // Set weather icon
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './images/clear.png';
                    break;
                case 'Clouds':
                    image.src = './images/cloud.png';
                    break;
                case 'Mist':
                    image.src = './images/mist.png';
                    break;
                case 'Rain':
                    image.src = './images/rain.png';
                    break;
                case 'Snow':
                    image.src = './images/snow.png';
                    break;
                default:
                    image.src = './images/404.png';
                    break;
            }

            // Update temperature, wind, and humidity
            temperature.innerHTML = `${Math.round(json.main.temp)}°C`;
            windContainer.innerHTML = `${json.wind.speed.toFixed(1)} km/h`;
            humidityContainer.innerHTML = `${json.main.humidity}%`; 
            weatherCondition.innerHTML= `${json.weather[0].description}`;
        })
        .catch(error => console.error("Error while fetching data: ", error));
});


