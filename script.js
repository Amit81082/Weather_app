// ✅ Your real API key here
const apiKey = '914d838a64ff368888411f8c7263f17f';

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const weatherCard = document.querySelector(".weather");
    const weatherIcon = document.querySelector(".weather-icon");
    const tempElement = document.querySelector(".temp");
    const cityElement = document.querySelector(".city");
    const detailsElement = document.querySelector(".details");

    // Initially hide weather details
    weatherCard.style.display = "none";
    weatherIcon.style.display = "none";
    tempElement.style.display = "none";
    cityElement.style.display = "none";
    detailsElement.style.display = "none";

    searchButton.addEventListener("click", () => {
        const cityName = searchInput.value.trim();

        if (cityName) {
            checkWeather(cityName);
        } else {
            alert("Please enter a city name.");
        }
    });

    async function checkWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);

            if (data.cod !== 200) {
                alert("City not found: " + data.message);
                return;
            }

            const weatherData = {
                temp: Math.round(data.main.temp) + '°C',
                city: data.name,
                humidity: data.main.humidity + '%',
                wind: data.wind.speed + ' km/h',
                icon: getWeatherIcon(data.weather[0].main.toLowerCase())
            };

            updateWeatherUI(weatherData);

        } catch (error) {
            alert("Something went wrong: " + error.message);
        }
    }

    function getWeatherIcon(weatherCondition) {
        if (weatherCondition.includes('cloud')) {
            return 'images/clouds.png';
        } else if (weatherCondition.includes('rain')) {
            return 'images/rain.png';
        } else if (weatherCondition.includes('clear')) {
            return 'images/clear.png';
        } else if (weatherCondition.includes('snow')) {
            return 'images/snow.png';
        } else if (weatherCondition.includes('mist')) {
            return 'images/mist.png';
        } else if (weatherCondition.includes('drizzle')) {
            return 'images/drizzle.png';
        } else {
            return 'images/default.png';
        }
    }

    function updateWeatherUI(data) {
        tempElement.textContent = data.temp;
        cityElement.textContent = data.city;
        document.querySelector(".percentage").textContent = data.humidity;
        document.querySelector(".speed").textContent = data.wind;
        weatherIcon.src = data.icon;

        // Show weather details
        weatherCard.style.display = "block";
        weatherIcon.style.display = "block";
        tempElement.style.display = "block";
        cityElement.style.display = "block";
        detailsElement.style.display = "flex";
    }
});
