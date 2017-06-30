var latitude = 0;
var longitude = 0;
var api_url = "http://api.openweathermap.org/data/2.5/weather?units=metric";
var wak = "01ac7bacc5235a5ef3c4bcc77ada03a0";
var req_url = "";
var temp_c = 0;
var temp_f = 0;
var toggle_status = "C"

$( document ).ready(function() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      req_url = api_url + "&lat=" + latitude + "&lon=" + longitude + "&appid=" + wak;

      $.getJSON(req_url, function(data) {
        temp_c = data.main.temp;
        temp_f = (temp_c * 1.8) + 32;
        var status = data.weather[0].main;
        var icon = data.weather[0].icon;
        var img_url = "url(img/" + icon + ".jpg)";
        var icon_url = "<img src=\"http://openweathermap.org/img/w/" + icon + ".png\"/>";
        var city_text = "<h2 class=\"title\">" + data.name + ", " + data.sys.country + "</h2>";
        var temperature_text = "<h2 class=subtitle>" + temp_c + "º C" + "</h2>";

        $('.hero-img').css('background-image', img_url);
        $('#icon-container').append(icon_url);
        $('#weather-container').append(temperature_text);
        $('#location-container').append(city_text);
        $('#status').text(status);
      })
    });
  }

  $('#toggle-units').click(function() {
    if (toggle_status == "C") {
      var temperature_text = temp_f + " Fº";
      $('h2.subtitle').text(temperature_text);
      toggle_status = "F";
    } else {
      var temperature_text = temp_c + " Cº";
      $('h2.subtitle').text(temperature_text);
      toggle_status = "C";
    }
  })
});