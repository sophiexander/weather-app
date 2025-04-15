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
      <h1>Now</h1>
      <div className="place-content-center flex">
        <img src={weather?.current.condition.icon} />
        <div>
          <p>{weather?.current.dewpoint_c}</p>
          <p>{weather?.current.gust_kph}</p>
        </div>
      </div>
      <div>
        <h1>Forecast</h1>
        {weather?.forecast.forecastday.map((day, i) => {
          const now = new Date();
          const date = new Date(day.date);

          return (
            <div>
              <p>
                {date.toLocaleDateString("en-NZ", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                })}
              </p>
              <div className="flex">
                {day.hour.map((hour, i) => {
                  const hourDate = new Date(hour.time);
                  if (now < hourDate) {
                    return (
                      <div key={i}>
                        <p>
                          {hourDate.toLocaleTimeString("en-NZ", {
                            hour12: true,
                            timeStyle: "short",
                          })}
                        </p>

                        <img src={hour.condition.icon} />
                      </div>
                    );
                  }
                })}
                ;
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
