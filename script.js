

$(function() {
  $.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
      var city = location.city,
        state = location.state,
        country = location.country_name,
        lat = location.latitude,
        long = location.longitude;

      $("#city").html(city + ", " + state + ", " + country);
      getWeather(lat, long);
    }
  });
});

function getWeather(lat, long) {
  $.ajax({
    url:
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        long,
    type: "get",
    success: function(data) {
      var temp = data.main.temp,
        tempC = Math.round(data.main.temp) + "&#8451;",
        tempF = Math.round(temp * 9 / 5 + 32) + "&#8457;",
        status = data.weather[0].main + " / " + data.weather[0].description,
        icon = data.weather[0].icon,
        humidity = data.main.humidity + "%";
      console.log(data, humidity);
      $("#icon").html("<img src='" + icon + "' />");
      $("#status").html(status + " / " + humidity + " humidity");
      $("#temp").html(tempF);

      $(".btn-primary").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        $(".celcius").hasClass("active")
          ? $("#temp").html(tempC)
          : $("#temp").html(tempF);
      });
    },
    error: function(error) {
      console.log(JSON.stringify(error));
    }
  });
}