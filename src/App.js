import React, { useState, useEffect } from "react";
import { Grid } from "react-loader-spinner";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "weather-icons/css/weather-icons.css";
import axios from "axios";
import bgImage from "./assets/images/bgImg.jpeg";
import cloudy from "./assets/images/clouds.jpeg";
import haze from "./assets/images/haze.jpg";
import rain from "./assets/images/rain.jpeg";
import snow from "./assets/images/snow.jpeg";
import sunny from "./assets/images/sunny.jpg";
import Header from "./components/Header";
import DisplayWeather from "./components/DisplayWeather";

const App = () => {
  // state variables
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [currWeather, setCurrWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [cityFromWeather, setCityFromWeather] = useState("");
  const [date, setDate] = useState(null);
  const [loader, setLoader] = useState(false);
  let [bgImg, setBgImg] = useState(bgImage);
  const [errorMessage, setErrorMessage] = useState(null);

  // Getting weather data from api
  const getWeatherData = async (city) => {
    try {
      // get weather data from openweather api
      const res = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a19358ea187a8bfc9c5524cc4489a585`
      );
      // console.log(res);
      let { coord } = res.data;
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
      setAddress("");
      setCurrWeather(res2.data);
      setForecast(res2.data.daily);

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

  // getting input data from input field when user select any suggested item
  const handleSelect = async (value) => {
    setAddress(value);
    
    const result = await geocodeByAddress(value);
    console.log("result",result);

    const cityName = result[0].address_components[0].long_name;
    if (cityName) {
      setCityFromWeather(cityName);
      setErrorMessage(null);
      setLoader(true);
      getWeatherData(cityName);
    } else {
      setErrorMessage("No Data");
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
      {isLoading ? (
        <div className="loader">
          <Grid color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div>
          <Header
            address={address}
            setAddress={setAddress}
            handleSelect={handleSelect}
          />
          {loader ? (
            <div className="loader">
              <Grid color="#00BFFF" height={80} width={80} />
            </div>
          ) : errorMessage ? (
            <div className="error-message">{errorMessage}</div>
          ) : (
            <DisplayWeather
              currWeather={currWeather}
              cityFromWeather={cityFromWeather}
              date={date}
              forecast={forecast}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
