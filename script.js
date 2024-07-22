const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '8215cae6673c845c400818fdf3082203';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './assets/clear.png';
                    break;

                case 'Rain':
                    image.src = './assets/rain.png';
                    break;

                case 'Snow':
                    image.src = './assets/snow.png';
                    break;

                case 'Clouds':
                    image.src = './assets/cloud.png';
                    break;

                case 'Mist':
                case 'Haze': 
                    image.src = './assets/mist.png';
                    break;

                default:
                    image.src = './assets/cloud.png';
                    break;
            }

            temperature.textContent = `${json.main.temp} °C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} Km/h`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
