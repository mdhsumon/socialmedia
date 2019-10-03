import React from "react"
import weatherImg from "../resources/images/weather.png"

export const WeatherForcast = () => {
    return (
        <div className="weather-forcast">
            <img src={weatherImg} style={{maxWidth: '100%', marginBottom: '10px', verticalAlign: 'middle'}} role="presentation" />
        </div>
    )
}