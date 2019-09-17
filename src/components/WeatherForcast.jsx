import React from "react";
import weather from "../resources/images/weather.png";

export const WeatherForcast = () => {
    return (
        <div className="weather-forcast">
            <img src={weather} role="presentation" />
        </div>
    )
}