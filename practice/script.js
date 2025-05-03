const localWeatherDB = {
    "mumbai": { temperature: "32°C", humidity: "60%", condition: "Sunny" },
    "delhi": { temperature: "28°C", humidity: "45%", condition: "Cloudy" },
    "chennai": { temperature: "34°C", humidity: "70%", condition: "Humid" },
    "bangalore": { temperature: "26°C", humidity: "50%", condition: "Rainy" }
  };


  function addcities(){
    localStorage.setItem("cities" , JSON.stringify(localWeatherDB));
  }
  window.onload = addcities;
  function getWeather(){

    const xhr = new XMLHttpRequest();
    let search = document.getElementById('searched-city').value.trim().toLowerCase();
    const list = localStorage.getItem("cities");
    for(let ct in list){
        if(ct === search){
            showdata(list[ct]);
        }
    }
    
    xhr.open("GET", "url");

     if(xhr.readyState == 4){

    }
  }



  function showdata(data){
    
  }