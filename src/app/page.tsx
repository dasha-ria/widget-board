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

  function getCurrentHour() {
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
    <div className="">
      <p className="p-2">Widget size samples</p>
      <div className="grid grid-cols-[repeat(6,200px)] auto-rows-[200px] gap-8 justify-center">
        <Widget size="small" className="bg-pink-500"></Widget>
        <Widget size="large" className="bg-purple-500">
          <div>
            {/* weather right now */}
            <div className="pt-8 flex">
              <p className="text-black text-4xl">
                {Math.round(currentWeatherData.temperature.value)}°
              </p>
              <p></p>
              <div className="flex gap-2">
                <p>
                  H: {Math.round(weatherData.dayIntervals[0].temperature.max)}°
                </p>
                <p>
                  L: {Math.round(weatherData.dayIntervals[0].temperature.min)}°
                </p>
              </div>
            </div>
            {/* weather in the following hours */}
            <div className="flex gap-4">
              <div className="flex flex-col">
                <p>{getCurrentHour()}</p>
                <p>{Math.round(currentWeatherData.temperature.value)}°</p>
              </div>
              <div className="flex flex-col">
                <p>{getHourFromData(weatherData.shortIntervals[0].start)}</p>
                <p>
                  {Math.round(weatherData.shortIntervals[0].temperature.value)}°
                </p>
              </div>

              {weatherData.shortIntervals
                .slice(1, 5)
                .map((shortInterval: any, index: any) => (
                  <div key={index} className="flex flex-col">
                    <p>{getHourFromData(shortInterval.start)}</p>
                    <p>{Math.round(shortInterval.temperature.value)}</p>
                  </div>
                ))}
            </div>
            {/* weather during the week */}
            <div className="">
              {weatherData.dayIntervals
                .slice(1, 6)
                .map((dayInterval: any, index: any) => (
                  <div key={index} className="flex gap-2">
                    <p>{getDayName(index + 2)}</p>
                    <div className="flex gap-8">
                      <p>{Math.round(dayInterval.temperature.min)}°</p>
                      <p>{Math.round(dayInterval.temperature.max)}°</p>
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
