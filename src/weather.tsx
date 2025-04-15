import { useEffect, useState } from "react";
import { WeatherResponse } from "./types/weather";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

type WeatherProps = {
  location: string;
};
export default function Weather({ location }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  location = "Orewa";
  console.log("WEATHER TESTR", location);
  useEffect(() => {
    console.log("in useeffect");
    if (location) {
      async function getWeather() {
        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        const weather: WeatherResponse = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`,
          options
        )
          .then((response) => response.json())
          .catch((e) => console.log(e));

        setWeather(weather);
      }
      getWeather();
    }
  }, [location]);

  console.log(weather);
  return (
    <>
      <h1>TODO fetch Weather... for {location}</h1>
      <div>
        <h1>Now</h1>
        <img src={weather?.current.condition.icon} />
        {weather?.current.condition.code}
      </div>
      <div>
        <h1>Forecast</h1>
        {weather?.forecast.forecastday.map((day, i) => {
          console.log(day.date);
          return (
            <div key={i}>
              <p>{day.date}</p>
              <img src={day.day.condition.icon} />
            </div>
            // add lucide icons
          );
        })}
      </div>
    </>
  );
}
