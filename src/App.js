import React, { useState } from "react";
import { Grid } from "react-loader-spinner";
import moment from "moment";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "weather-icons/css/weather-icons.css";
import axios from "axios";
import bgImage from "./assets/images/bgImg.jpeg";
import cloudy from "./assets/images/clouds.jpeg";
import haze from "./assets/images/haze.jpg";
import rain from "./assets/images/rain.jpeg";
import snow from "./assets/images/snow.jpeg";
import sunny from "./assets/images/sunny.jpg";
import CarouselComp from "./components/CarouselComp";
import windmill from "./assets/images/windmill.gif";

const App = () => {
  // state variables
  const [address, setAddress] = useState("");
  const [currWeather, setCurrWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState(null);
  const [date, setDate] = useState(null);
  const [loader, setLoader] = useState(false);
  let [bgImg, setBgImg] = useState(bgImage);
  const [errorMessage, setErrorMessage] = useState(null);

  // when someone click on search button then this functin can be called
  const handleSubmit = () => {
    setErrorMessage(null);
    setLoader(true);
    if (address) {
      getWeatherData();
    }
  };

  // Getting weather data from api
  const getWeatherData = async () => {
    try {
      // get weather data from openweather api
      const res = await axios(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a19358ea187a8bfc9c5524cc4489a585`
      );
      let { coord } = res.data;
      console.log(coord);
      const res2 = await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=113a87400b5261ba9851509613687a2e`
      );

      // formate date
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dt = res2.data.current.dt;
      const timeStamp = new Date(dt * 1000);
      const d = timeStamp.toLocaleDateString("en-US", options);
      setDate(d);

      // set weather data came from api into state
      setLoader(false);
      setCurrWeather(res2.data);
      setForecast(res2.data.daily);

      console.log("current weather response ====", res2.data.timezone);

      // handling background images dynamically for each weather condition
      const currConditon = res2.data.current.weather[0].description;
      if (currConditon.toLowerCase().includes("clear")) {
        setBgImg(sunny);
      } else if (currConditon.toLowerCase().includes("clouds")) {
        setBgImg(cloudy);
      } else if (currConditon.toLowerCase().includes("haze")) {
        setBgImg(haze);
      } else if (currConditon.toLowerCase().includes("rain")) {
        setBgImg(rain);
      } else if (currConditon.toLowerCase().includes("snow")) {
        setBgImg(snow);
      } else if (currConditon.toLowerCase().includes("sunny")) {
        setBgImg(sunny);
      } else {
        setBgImg(sunny);
      }
    } catch (error) {
      setLoader(false);
      setCurrWeather(null);
      setErrorMessage("No Data");
      console.log(error);
    }
  };
  // console.log(currWeather);
  // getting input data from input field when use select any suggestion item
  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const cityName = result[0].address_components[0].short_name;

    // const latLng = await getLatLng(result[0]);

    setAddress(value);
    setCity(cityName);
  };

  // format time
  const currTime = (ms) => {
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

  const toCapitalizCase = (str) => {
    // convert str into array
    const arr = str.split(" ");
    // capitalize first letter of every word in array
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  };

  const getWeatherIcons = (iconId) => {
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
      case iconId == "01d" || iconId == "01n":
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

  const container = {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${bgImg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    marginTop: "none",
    border: "1px solid black",
    minHeight: "100vh",
  };

  return (
    <div style={container}>
      <header>
        <div className="logo">
          <h1>Mosam</h1>
        </div>
        <div className="search">
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <>
                <div className="input-item">
                  <input
                    {...getInputProps({ placeholder: "Type City" })}
                    required
                  />
                  <div>
                    {
                      // loading ? (
                      //   <div>Loading...</div>
                      // ) :
                      suggestions.map((suggestion, idx) => {
                        const style = {
                          backgroundColor: suggestion.active ? "#999" : "#fff",
                        };
                        return (
                          <div
                            className="suggestion"
                            key={idx}
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {" "}
                            {suggestion.description}{" "}
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                <button onClick={handleSubmit}>Search</button>
              </>
            )}
          </PlacesAutocomplete>
        </div>
      </header>
      {loader ? (
        <div className="loader">
          <Grid color="#00BFFF" height={80} width={80} />
        </div>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <div style={{ display: `${currWeather ? "block" : "none"}` }}>
          <div className="main">
            <div className="main-wrapper">
              <div className="main-item main-item1">
                <h1>{city && city}</h1>
                <p>{date}</p>
                <div className="main-item__sub">
                  {/* data.current.weather[0].id */}
                  <div className="main-item____sub main-item____sub1">
                    <i
                      className={
                        currWeather &&
                        getWeatherIcons(currWeather.current.weather[0].icon)
                      }
                      style={{ fontSize: "30px", marginTop: "0.5rem" }}
                    ></i>
                  </div>
                  <div className="main-item____sub main-item____sub2">
                    <h3>
                      {currWeather && Math.round(currWeather.current.temp)}
                      <span>&#8451;</span>{" "}
                    </h3>
                    <h2>
                      {currWeather &&
                        toCapitalizCase(
                          currWeather.current.weather[0].description
                        )}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="main-item main-item2">
                <div>
                  <h3>{currWeather && currWeather.current.humidity}%</h3>
                  <h3>Humidity</h3>
                  <br />
                  <h3>{currWeather && currWeather.current.wind_speed} mph</h3>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: ".7rem",
                      width: "60px",
                    }}
                  >
                    <img src={windmill} style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <h3>
                    {currWeather && currTime(currWeather.current.sunrise)}
                  </h3>
                  <h3>Sunrise</h3>
                  <br />

                  <h3>{currWeather && currTime(currWeather.current.sunset)}</h3>
                  <h3>Sunset</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <h1>7 Days Forecast</h1>
            {forecast && (
              <CarouselComp className="slide-wrapper" forecast={forecast} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
