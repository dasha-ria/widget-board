import Image from "next/image";

export default async function Home() {
  const res = await fetch(
    "https://www.yr.no/api/v0/locations/2-2666772/forecast"
  );
  const weatherData = await res.json();

  function getDayName(daysInFuture: number) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysInFuture);

    return daysOfWeek[futureDate.getDay()];
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
    </div>
  );
}
