// Mock Local Repository (simulate backend data)
const localWeatherDB = {
    "mumbai": { temperature: "32°C", humidity: "60%", condition: "Sunny" },
    "delhi": { temperature: "28°C", humidity: "45%", condition: "Cloudy" },
    "chennai": { temperature: "34°C", humidity: "70%", condition: "Humid" },
    "bangalore": { temperature: "26°C", humidity: "50%", condition: "Rainy" }
  };
  
  function getWeather() {
    const city = document.getElementById("cityInput").value.trim().toLowerCase();
    if (!city) return alert("Please enter a city name.");
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "fake-url", true); // We're not really using the URL since data is local
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const searchedCities = JSON.parse(localStorage.getItem("cities")) || [];
  
        const exists = searchedCities.some(c => c.city === city);
        if (exists) {
          alert("City already searched! Showing last result.");
          const lastResult = searchedCities.find(c => c.city === city);
          return displayWeather(lastResult);
        }
  
        // Simulate fetching from local repo
        const weather = localWeatherDB[city];
        if (!weather) return alert("City not found in local weather database.");
  
        const weatherData = { city, ...weather };
  
        searchedCities.push(weatherData);
        localStorage.setItem("cities", JSON.stringify(searchedCities));
  
        displayWeather(weatherData);
      }
    };
  
    // Just a dummy send to trigger XHR
    xhr.send(JSON.stringify({ city }));
  }
  
  function displayWeather(data) {
    const resultDiv = document.getElementById("weatherResult");
    resultDiv.innerHTML = `
      <h3>Weather in ${data.city.charAt(0).toUpperCase() + data.city.slice(1)}</h3>
      <p>Temperature: ${data.temperature}</p>
      <p>Humidity: ${data.humidity}</p>
      <p>Condition: ${data.condition}</p>
    `;
  }
  