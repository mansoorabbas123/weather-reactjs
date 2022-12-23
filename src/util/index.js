import moment from "moment";
 
 // format time
 export const currTime = (ms) => {
    // let date = new Date(ms * 1000);
    // console.log(date);
    let unix_timestamp = ms;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();
    var ampm = hours >= 12 ? "pm" : "am";
    // Will display time in 10:30:23 format
    var time = hours + ":" + minutes.substr(-2);
    const number = moment(time, ["HH.mm"]).format("hh:mm a");

    return number;
  };

  export const getWeatherIcons = (iconId) => {
    switch (iconId) {
      case iconId == "11d":
        return "wi wi-thunderstorm";
      case iconId == "09d":
        return "wi wi-storm-showers";
      case iconId == "10d" || iconId == "13d" || iconId == "09d":
        return "wi wi-rain";
      case iconId == "13d":
        return "wi wi-snow";
      case iconId == "50d":
        return "wi wi-smoke";
      case iconId == "01d" || iconId == "01n".toString():
        return "wi wi-day-sunny";
      case iconId == "02d" ||
        iconId === "02n" ||
        iconId === "03d" ||
        iconId === "03n" ||
        iconId === "04d" ||
        iconId === "04n" ||
        iconId === "04d" ||
        iconId === "04n":
        return "wi wi-cloudy";
      default:
        return "wi wi-day-sunny";
    }
  };

  export const toCapitalizCase = (str) => {
    // convert str into array
    const arr = str.split(" ");
    // capitalize first letter of every word in array
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  };