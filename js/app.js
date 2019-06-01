// Search on enter key event
App = {
  search: function(e) {
    if (e.keyCode == 13) {
      var val = document.getElementById("search-field").value;
      window.open("https://google.com/search?q=" + val);
      document.getElementById('search-field').value = '';
      document.getElementById('search-field').blur();
      document.getElementById('search').style.display = 'none';
    }
  },

  // Get current time and format
  getTime: function() {
    var date = new Date();
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  },

  getWeatherIcon: function(iconCode){
    var dayNight = iconCode.slice(2, 3);
    console.log(dayNight);
    var code = iconCode.slice(0, 2);
    if (dayNight == "d"){
      switch (code){
        case "01":
          return "images/sunny.png";
        case "02":
          return "images/partly_cloudy.png";
        case "03":
          return "images/cloudy.png";
        case "04":
          return "images/cloud_s_sunny.png";
        case "09":
          return "images/rain_s_cloudy.png";
        case "10":
          return "images/rain.png";
        case "11":
          return "images/thunderstorms.png";
        case "13":
          return "images/snow.png";
        case "50":
          return "images/mist.png";
        default:
          return null;
      }
    } else {
      switch (code){
        case "01":
          return "images/night.png";
        case "02":
          return "images/night_partly_cloudy.png";
        case "03":
          return "images/cloudy.png";
        case "04":
          return "images/cloudy_night.png";
        case "09":
          return "images/rain_night.png";
        case "10":
          return "images/rain.png";
        case "11":
          return "images/thunderstorms.png";
        case "13":
          return "images/night_snow.png";
        case "50":
          return "images/mist.png";
        default:
          return null;
      }
    }
  },

  getWeather: function(){
    var xhr = new XMLHttpRequest();
    /* OPEN WEATHER MAP */
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=2147714&appid=9900eab5f0e2073723150704ad97acb2&units=metric');
    xhr.onload = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          var temp = json.main.temp.toFixed(0) + "&deg;C";
          var weatherDescription = json.weather[0].description;
          var weatherIcon = App.getWeatherIcon(json.weather[0].icon);
          if (weatherIcon){
            document.getElementById("weather").innerHTML = weatherDescription + " - " + temp;
            document.getElementById("weather-icon").src = weatherIcon;
          } else {
            document.getElementById("weather").innerHTML = weatherDescription + " - " + temp;
          }
        } else {
          console.log('error msg: ' + xhr.status);
        }
      }
    }

    /* Aus BOM */
    //xhr.open('GET', "https://api.weather.bom.gov.au/v1/locations/r3gx2f/observations");
    //xhr.onload = () => {
    //  if (xhr.readyState === 4) {
    //    if (xhr.status === 200) {
    //      var json = JSON.parse(xhr.responseText);
    //      //var temp = json.main.temp.toFixed(0) + "&deg;C";
    //    } else {
    //      console.log('error msg: ' + xhr.status);
    //    }
    //}
    xhr.send();
  },

  init: function(){
    /* CLOCK */
    document.getElementById("clock").innerHTML = App.getTime();
    setInterval(function() {
      document.getElementById("clock").innerHTML = App.getTime();
    }, 30000);

    /* Weather */
    App.getWeather();

    /* EVENT LISTENERS */
    // search when th enter key is pressed
    var searchField = document.getElementById("search-field");
    searchField.addEventListener("keypress", function(event){
      return App.search(event);
    });

    // search field shorcut
    document.addEventListener("keydown", function(event) {
      if (event.keyCode == 32) {          // Spacebar code to open search
        document.getElementById('search').style.display = 'flex';
        document.getElementById('search-field').focus();
      } else if (event.keyCode == 27) {   // Esc to close search
        document.getElementById('search-field').value = '';
        document.getElementById('search-field').blur();
        document.getElementById('search').style.display = 'none';
      }
    });
  }
}

window.onload = App.init();

