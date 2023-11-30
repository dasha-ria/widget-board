import Image from "next/image";

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

  function roundNumber(num: number) {
    return Math.round(num);
  }

  function getCurrentHour() {
    const now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    return `${currentHour < 10 ? "0" : ""}${currentHour}:${
      currentMinute < 10 ? "0" : ""
    }${currentMinute}`;
  }

  function getHourFromData(data: any) {
    const date = new Date(data);
    return date.getHours().toString().padStart(2, "0");
  }

  return (
    <div>
      <div className="p-2">
        <div>
          <p>temperature right now</p>
          <p>{weatherData.shortIntervals[0].temperature.value}°C</p>
        </div>
        <div>
          <p>wind speed right now</p>
          <p>{weatherData.shortIntervals[0].wind.speed} m/s</p>
        </div>
        <div>
          <p>precipitation right now</p>
          <p>{weatherData.shortIntervals[0].precipitation.value} mm</p>
        </div>
      </div>
      <div className="p-2">
        <div>
          <p>temperatures tomorrow</p>
          <p>min: {weatherData.dayIntervals[1].temperature.min}°C</p>
          <p>max: {weatherData.dayIntervals[1].temperature.max}°C</p>
        </div>
        <div>
          <p>temperatures {getDayName(2)}</p>
          <p>min: {weatherData.dayIntervals[2].temperature.min}°C</p>
          <p>max: {weatherData.dayIntervals[2].temperature.max}°C</p>
        </div>
        <div>
          <p>temperatures {getDayName(3)}</p>
          <p>min: {weatherData.dayIntervals[3].temperature.min}°C</p>
          <p>max: {weatherData.dayIntervals[3].temperature.max}°C</p>
        </div>
      </div>

      <div className="">
        <p className="p-2">Widget size samples</p>
        <div className="grid grid-cols-[repeat(6,200px)] auto-rows-[200px] gap-8 justify-center">
          <Widget size="small" className="bg-pink-500"></Widget>
          <Widget size="large" className="bg-purple-500">
            <div>
              {/* weather right now */}
              <div className="pt-8 flex">
                <p className="text-black text-4xl">
                  {roundNumber(currentWeatherData.temperature.value)}°
                </p>
                <div className="flex gap-2">
                  <p>
                    H:{" "}
                    {roundNumber(weatherData.dayIntervals[0].temperature.max)}°
                  </p>
                  <p>
                    L:{" "}
                    {roundNumber(weatherData.dayIntervals[0].temperature.min)}°
                  </p>
                </div>
              </div>
              {/* weather in the following hours */}
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <p>{getCurrentHour()}</p>
                  <p>{roundNumber(currentWeatherData.temperature.value)}°</p>
                </div>
                <div className="flex flex-col">
                  <p>{getHourFromData(weatherData.shortIntervals[0].start)}</p>
                  <p>
                    {roundNumber(
                      weatherData.shortIntervals[0].temperature.value
                    )}
                    °
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>{getHourFromData(weatherData.shortIntervals[1].start)}</p>
                  <p>
                    {roundNumber(
                      weatherData.shortIntervals[1].temperature.value
                    )}
                    °
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>{getHourFromData(weatherData.shortIntervals[2].start)}</p>
                  <p>
                    {roundNumber(
                      weatherData.shortIntervals[2].temperature.value
                    )}
                    °
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>{getHourFromData(weatherData.shortIntervals[3].start)}</p>
                  <p>
                    {roundNumber(
                      weatherData.shortIntervals[3].temperature.value
                    )}
                    °
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>{getHourFromData(weatherData.shortIntervals[4].start)}</p>
                  <p>
                    {roundNumber(
                      weatherData.shortIntervals[4].temperature.value
                    )}
                    °
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>{getHourFromData(weatherData.shortIntervals[5].start)}</p>
                  <p>
                    {roundNumber(
                      weatherData.shortIntervals[5].temperature.value
                    )}
                    °
                  </p>
                </div>
              </div>
              {/* weather during the week */}
              <div className="">
                <div className="flex gap-2">
                  <p>{getDayName(2)}</p>
                  <div className="flex gap-8">
                    <p>
                      {roundNumber(weatherData.dayIntervals[2].temperature.min)}
                      °
                    </p>
                    <p>
                      {roundNumber(weatherData.dayIntervals[2].temperature.max)}
                      °
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p>{getDayName(3)}</p>
                  <div className="flex gap-8">
                    <p>
                      {roundNumber(weatherData.dayIntervals[3].temperature.min)}
                      °
                    </p>
                    <p>
                      {roundNumber(weatherData.dayIntervals[3].temperature.max)}
                      °
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p>{getDayName(4)}</p>
                  <div className="flex gap-8">
                    <p>
                      {roundNumber(weatherData.dayIntervals[4].temperature.min)}
                      °
                    </p>
                    <p>
                      {roundNumber(weatherData.dayIntervals[4].temperature.max)}
                      °
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p>{getDayName(5)}</p>
                  <div className="flex gap-8">
                    <p>
                      {roundNumber(weatherData.dayIntervals[5].temperature.min)}
                      °
                    </p>
                    <p>
                      {roundNumber(weatherData.dayIntervals[5].temperature.max)}
                      °
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p>{getDayName(6)}</p>
                  <div className="flex gap-8">
                    <p>
                      {roundNumber(weatherData.dayIntervals[6].temperature.min)}
                      °
                    </p>
                    <p>
                      {roundNumber(weatherData.dayIntervals[6].temperature.max)}
                      °
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </div>
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
