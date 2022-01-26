import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "weather-icons/css/weather-icons.css";
import axios from "axios";
import bgImage from "./assets/images/search-background.jpg";
import cloudsImg from "./assets/images/clouds.jpeg";
import darkCloudsImg from "./assets/images/darkClouds.jpg";
import hazeImg from "./assets/images/haze.jpg";
import nightSkyImg from "./assets/images/nightSky.jpg";
import rainImg from "./assets/images/rain.jpeg";
import snowImg from "./assets/images/snow.jpeg";
import sunnyImg from "./assets/images/sunny.jpg";

const App = () => {
  const [address, setAddress] = useState("");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [date, setDate] = useState(null);
  const [cordinates, setCordinates] = useState({
    lat: null,
    lng: null,
  });
  const [bgImg, setBgImg] = useState(bgImage);

  const weatherConditions = [
    "Clear",
    "Sunny",
    "Partially cloudy",
    "Cloudy",
    "scattered clouds",
    "Overcast",
    "Rain",
    "Thundersnows",
    "Tornadoes",
    "Fog",
    "Hurricanes",
    "Sandstorms",
  ];

  const handleSubmit = () => {
    setCity(address);
    if (address) {
      getWeatherData();
    }
  };

  const getWeatherData = async () => {
    try {
      // get weather data from openweather api
      const { data } = await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lng}&units=metric&appid=113a87400b5261ba9851509613687a2e`
      );
      // formate date
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dt = data.current.dt;
      const timeStamp = new Date(dt * 1000);
      const d = timeStamp.toLocaleDateString("en-US", options);
      setDate(d);

      // set weather data came from api into state
      setWeather(data);

      // handling background images dynamically for each weather condition
      if (data.current.weather[0].main === "Clear") {
        setBgImg(sunnyImg);
      } else if (data.current.weather[0].main === "Clouds") {
        setBgImg(cloudsImg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setCordinates(latLng);
    setAddress(value);
  };
  if (weather) {
    console.log(weather.current.weather[0]);
  }
  // console.log(address);

  const styles = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    marginTop: "none",
    border: "1px solid black",
  };

  return (
    <>
      <div style={styles}>
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
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        suggestions.map((suggestion, idx) => {
                          const style = {
                            backgroundColor: suggestion.active
                              ? "#777"
                              : "#fff",
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
                      )}
                    </div>
                  </div>
                  <button onClick={handleSubmit}>Search</button>
                </>
              )}
            </PlacesAutocomplete>
          </div>
        </header>
        <div className="main">
          <div className="main-wrapper">
            <div className="main-item main-item1">
              <h1>{city && city}</h1>
              <p>{date}</p>
              <div className="main-item__sub">
                <div className="main-item____sub main-item____sub1">
                  {weather
                    ? weatherConditions.map((el) => {
                        if (
                          weather.current.weather[0].description
                            .toLowerCase()
                            .match(/`${el}`/i) !== null
                        ) {
                          return (
                            <i className={`wi wi-day-${el.toLowerCase()}`}></i>
                          );
                        }
                      })
                    : ""}
                </div>
                <div className="main-item____sub main-item____sub2">14.0</div>
              </div>
            </div>
            <div className="main-item main-item2">item two</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
