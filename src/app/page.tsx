import Image from "next/image";
import {
  WiDayCloudy,
  WiCloudy,
  WiDaySunny,
  WiSnowflakeCold,
  WiRain,
  WiShowers,
  WiNightShowers,
  WiRainMix,
  WiSleet,
  WiNightClear,
  WiNightCloudy,
} from "react-icons/wi";

export default async function Home() {
  const res = await fetch(
    "https://www.yr.no/api/v0/locations/2-2666772/forecast",
    {
      cache: "no-store",
    }
  );
  const weatherData = await res.json();

  const resCurrent = await fetch(
    "https://www.yr.no/api/v0/locations/2-2666772/forecast/currenthour",
    { cache: "no-store" }
  );
  const currentWeatherData = await resCurrent.json();

  function getDayName(daysInFuture: number) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysInFuture);

    return daysOfWeek[futureDate.getDay()];
  }

  function getCurrentTime() {
    const now = new Date();

    return now.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getHourFromData(date: any) {
    const newDate = new Date(date);
    return newDate.getHours().toString().padStart(2, "0");
  }

  return (
    <div className="w-screen h-screen fixed bg-gradient-to-br from-[#E8F9FD] via-[#F5E6FE] to-[#FCE8E8] animate-mellow-bg acccent-pink-300 -z-10">
      <p className="p-2">Widget size samples</p>
      <div className="grid grid-cols-[repeat(6,200px)] auto-rows-[200px] gap-8 justify-center">
        <Widget
          size="small"
          className="bg-gradient-to-tr from-[#BCBBFF] to-[#DAD9FF]"
        ></Widget>

        <Widget
          size="large"
          className="bg-gradient-to-tr from-[#BCBBFF] to-[#DAD9FF]"
        >
          <div>
            {/* weather right now */}
            <div className="pt-8 flex justify-between px-8 items-center">
              <p className="text-[#6663fd] text-4xl font-medium">
                {Math.round(currentWeatherData.temperature.value)}°
              </p>
              <div>
                <p className="text-[#6663fd] font-medium">
                  {Math.round(currentWeatherData.wind.speed)} m/s
                </p>
                <div className="flex gap-2">
                  <p className="text-[#6663fd] font-medium">
                    H: {Math.round(weatherData.dayIntervals[0].temperature.max)}
                    °
                  </p>
                  <p className="text-[#6663fd] font-medium">
                    L: {Math.round(weatherData.dayIntervals[0].temperature.min)}
                    °
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[90%] h-[0.8px] mx-auto mt-5 mb-3 bg-[#aba8ff]"></div>
            {/* weather in the following hours */}
            <div className="flex justify-around px-3">
              <div className="flex flex-col items-center gap-1">
                <p className="text-[#7f7dff]">{getCurrentTime()}</p>
                <span className="text-[#5a57ff] fill-current scale-150">
                  <WeatherIcon
                    symbol={currentWeatherData.symbolCode.next1Hour}
                  ></WeatherIcon>
                </span>
                <p className="text-[#6663fd] font-medium">
                  {Math.round(currentWeatherData.temperature.value)}°
                </p>
              </div>

              {weatherData.shortIntervals
                .slice(1, 6)
                .map((shortInterval: any, index: any) => (
                  <div key={index} className="flex flex-col gap-1">
                    <p className="text-[#7f7dff]">
                      {getHourFromData(shortInterval.start)}
                    </p>
                    <span className="text-[#5a57ff] fill-current scale-150">
                      <WeatherIcon
                        symbol={shortInterval.symbolCode.next1Hour}
                      ></WeatherIcon>
                    </span>
                    <p className="text-[#6663fd] font-medium">
                      {Math.round(shortInterval.temperature.value)}
                    </p>
                  </div>
                ))}
            </div>
            <div className="w-[90%] h-[1px] bg-[#aba8ff] mx-auto mt-3 mb-3"></div>
            {/* weather during the week */}
            <div className="flex flex-col gap-2 items-center">
              {weatherData.dayIntervals
                .slice(1, 7)
                .map((dayInterval: any, index: any) => (
                  <div key={index} className="flex w-[90%] px-3 items-center">
                    <p className="w-1/4 text-[#6663fd]">
                      {getDayName(index + 2)}
                    </p>
                    <span className="text-[#5a57ff] fill-current scale-150">
                      <WeatherIcon
                        symbol={dayInterval.twentyFourHourSymbol}
                      ></WeatherIcon>
                    </span>
                    <div className="flex justify-end w-3/4 gap-8 items-center">
                      <p className="w-10 text-right text-[#6663fd]">
                        {Math.round(dayInterval.temperature.min)}°
                      </p>
                      <TemperatureSpan
                        temperatures={weatherData.dayIntervals
                          .slice(1, 7)
                          .map((dayInterval: any) => [
                            Math.round(dayInterval.temperature.min),
                            Math.round(dayInterval.temperature.max),
                          ])
                          .flat()}
                        min={Math.round(dayInterval.temperature.min)}
                        max={Math.round(dayInterval.temperature.max)}
                      ></TemperatureSpan>
                      <p className="w-4 text-right text-[#6663fd] font-medium">
                        {Math.round(dayInterval.temperature.max)}°
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Widget>
      </div>
    </div>
  );
}

function normalize(min: number, max: number, value: number) {
  return (value - min) / (max - min);
}

type TemperatureSpanProps = {
  temperatures: number[];
  min: number;
  max: number;
};

function TemperatureSpan({ temperatures, min, max }: TemperatureSpanProps) {
  const globalMin = Math.min(...temperatures);
  const globalMax = Math.max(...temperatures);

  const normalizedMin =
    Math.min(normalize(globalMin, globalMax, min), 0.95) * 100;
  const normalizedMax =
    Math.max(normalize(globalMin, globalMax, max), 0.05) * 100;

  const length = normalizedMax - normalizedMin;

  return (
    <div className="w-[40%] h-1 bg-[#a9a7fc] rounded-full">
      <div
        className="bg-[#5c71ea] h-1 rounded-full"
        style={{
          width: `${length}%`,
          marginLeft: `${normalizedMin}%`,
        }}
      ></div>
    </div>
  );
}

function Widget({
  size = "small",
  className = "",
  children,
}: {
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
}) {
  const classes = ["rounded-xl", ...className.split(" ")];

  if (size === "small") {
    classes.push("col-span-1", "row-span-1");
  } else if (size === "medium") {
    classes.push("col-span-2", "row-span-1");
  } else if (size === "large") {
    classes.push("col-span-2", "row-span-2");
  }
  return <div className={classes.join(" ")}>{children}</div>;
}

type WeatherIconProps = {
  symbol:
    | "cloudy"
    | "partlycloudy_day"
    | "partlycloudy_night"
    | "lightsnow"
    | "snow"
    | "lightrain"
    | "rain"
    | "lightsleet"
    | "sleet"
    | "clearsky_day"
    | "clearsky_night"
    | "fair_day"
    | "fair_night"
    | "lightrainshowers_day"
    | "lightrainshowers_night";
  children?: React.ReactNode;
  className?: string;
};

function WeatherIcon({ symbol, children, className }: WeatherIconProps) {
  switch (symbol) {
    case "cloudy":
      return <WiCloudy />;
    case "partlycloudy_day":
      return <WiDayCloudy></WiDayCloudy>;
    case "partlycloudy_night":
      return <WiNightCloudy></WiNightCloudy>;
    case "lightsnow":
      return <WiSnowflakeCold></WiSnowflakeCold>;
    case "snow":
      return <WiSnowflakeCold></WiSnowflakeCold>;
    case "lightrain":
      return <WiRain></WiRain>;
    case "rain":
      return <WiRain></WiRain>;
    case "lightsleet":
      return <WiSleet></WiSleet>;
    case "sleet":
      return <WiSleet></WiSleet>;
    case "clearsky_day":
      return <WiDaySunny></WiDaySunny>;
    case "clearsky_night":
      return <WiNightClear></WiNightClear>;
    case "clearsky_day":
      return <WiDayCloudy></WiDayCloudy>;
    case "clearsky_night":
      return <WiNightCloudy></WiNightCloudy>;
    case "lightrainshowers_day":
      return <WiShowers></WiShowers>;
    case "lightrainshowers_night":
      return <WiNightShowers></WiNightShowers>;

    default:
      return <span>{symbol}</span>;
  }
}
