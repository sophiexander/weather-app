import { useEffect, useState } from "react";
import { WeatherResponse } from "./types/weather";
import {
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Umbrella,
  Wind,
  WindArrowDown,
} from "lucide-react";
import Map from "./map";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

type WeatherProps = {
  location: string;
};

export default function Weather({ location }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  location = "Christchurch";
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
  let dateUpdated;
  if (weather?.current.last_updated) {
    const dateCurrentForecast = new Date(weather?.current.last_updated);
    dateUpdated = `Last Updated: 
    ${dateCurrentForecast.toLocaleDateString("en-NZ", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    })} 
    ${dateCurrentForecast.toLocaleTimeString("en-NZ", {
      hour12: true,
      timeStyle: "short",
    })}`;
  }

  return (
    <>
      <h1>TODO fetch Weather... for {location}</h1>
      {weather ? (
        <Map latitude={weather.location.lat} longitude={weather.location.lon} />
      ) : (
        ""
      )}
      <p>{dateUpdated}</p>

      {/* todo add a map feature and pin the location on it */}
      <div className="place-content-center flex">
        <div>
          <img src={weather?.current.condition.icon} />
        </div>
        <div>
          <div className="flex whitespace-nowrap p-1">
            <Thermometer />
            <p className="pl-2">{weather?.current.temp_c} °C</p>
          </div>
          <div className="flex whitespace-nowrap p-1">
            <Wind />
            <p className="pl-2">{weather?.current.wind_kph} kph</p>
          </div>
          <div className="flex whitespace-nowrap p-1">
            <WindArrowDown />
            <p className="pl-2">{weather?.current.wind_dir}</p>
          </div>
          <div className="flex p-1">
            <Sun />
            <p className="pl-2">{weather?.current.uv}</p>
          </div>
        </div>
      </div>
      <div>
        {weather?.forecast.forecastday.map((day, i) => {
          const now = new Date();
          const date = new Date(day.date);

          return (
            <div key={i}>
              <div className="flex place-content-between mx-4">
                <p>
                  {date.toLocaleDateString("en-NZ", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                  })}
                </p>
                <div className="flex">
                  <div className="flex whitespace-nowrap p-1">
                    <Sunrise />
                    <p className="pl-2">{day.astro.sunrise}</p>
                  </div>
                  <div className="flex whitespace-nowrap p-1">
                    <Sunset />
                    <p className="pl-2">{day.astro.sunset}</p>
                  </div>
                </div>
              </div>
              {/* w-[100cqw] */}
              <div className=" overflow-auto">
                <div className="flex">
                  {day.hour.map((hour, i) => {
                    const hourDate = new Date(hour.time);
                    if (now < hourDate) {
                      return (
                        <div key={i} className="m-2 flex-auto">
                          <p className="whitespace-nowrap m-1">
                            {hourDate.toLocaleTimeString("en-NZ", {
                              hour12: true,
                              timeStyle: "short",
                            })}
                          </p>
                          <div className="place-content-center flex">
                            <img src={hour.condition.icon} />
                          </div>
                          <div className="flex whitespace-nowrap p-1">
                            <Thermometer />
                            <p className="pl-2">{hour.temp_c} °C</p>
                          </div>
                          <div className="flex whitespace-nowrap p-1">
                            <Wind />
                            <p className="pl-2">{hour.wind_kph} kph</p>
                          </div>
                          <div className="flex whitespace-nowrap p-1">
                            <WindArrowDown />
                            <p className="pl-2">{hour.wind_dir}</p>
                          </div>
                          <div className="flex whitespace-nowrap p-1">
                            <Umbrella />
                            <p className="pl-2">{hour.chance_of_rain}</p>
                          </div>
                          <div className="flex p-1">
                            <Sun />
                            <p className="pl-2">{hour.uv}</p>
                          </div>
                        </div>
                      );
                    }
                  })}
                  ;
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
