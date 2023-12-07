import WeatherIcon from "@/components/weather-icon";
import Widget from "@/components/widget";
import TemperatureSpan from "@/components/temperature-span";
import { getHourFromDate, getCurrentTime, getDayName } from "@/utils/time";

export default async function WeatherWidget() {
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
  return (
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
                H: {Math.round(weatherData.dayIntervals[0].temperature.max)}°
              </p>
              <p className="text-[#6663fd] font-medium">
                L: {Math.round(weatherData.dayIntervals[0].temperature.min)}°
              </p>
            </div>
          </div>
        </div>
        <div className="w-[90%] h-[0.8px] mx-auto mt-5 mb-3 bg-[#aba8ff]"></div>
        {/* weather in the following hours */}
        <div className="flex justify-around px-3">
          <div className="flex flex-col gap-1 items-center">
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
              <div key={index} className="flex flex-col gap-1 items-center">
                <p className="text-[#7f7dff]">
                  {getHourFromDate(shortInterval.start)}
                </p>
                <span className="text-[#5a57ff] fill-current scale-150">
                  <WeatherIcon
                    symbol={shortInterval.symbolCode.next1Hour}
                  ></WeatherIcon>
                </span>
                <p className="text-[#6663fd] font-medium">
                  {Math.round(shortInterval.temperature.value)}°
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
                <p className="w-1/4 text-[#6663fd]">{getDayName(index + 2)}</p>
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
  );
}
