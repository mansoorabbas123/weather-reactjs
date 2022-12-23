import React from "react";
import { currTime, getWeatherIcons, toCapitalizCase } from "../util";
import windmill from "./../assets/images/windmill.gif";
import CarouselComp from "./CarouselComp";

const DisplayWeather = ({ currWeather, cityFromWeather, date, forecast }) => {
  return (
    <div style={{ display: `${currWeather ? "block" : "none"}` }}>
      <div className="main">
        <div className="main-wrapper">
          <div className="main-item main-item1">
            <h1>{cityFromWeather && cityFromWeather}</h1>
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
                    toCapitalizCase(currWeather.current.weather[0].description)}
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
              <h3>{currWeather && currTime(currWeather.current.sunrise)}</h3>
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
  );
};

export default DisplayWeather;
