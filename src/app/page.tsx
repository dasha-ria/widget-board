import Electricity from "@/components/electricity";
import WeatherWidget from "@/components/weather-widget";
import Widget from "@/components/widget";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen fixed bg-gradient-to-br from-[#E8F9FD] via-[#F5E6FE] to-[#FCE8E8] animate-mellow-bg acccent-pink-300 -z-10">
      <p className="p-2">Widget size samples</p>
      <div className="grid grid-cols-[repeat(6,200px)] auto-rows-[200px] gap-8 justify-center">
        <Widget
          size="small"
          className="bg-gradient-to-tr from-[#BCBBFF] to-[#DAD9FF]"
        ></Widget>
        <WeatherWidget></WeatherWidget>
        <Widget
          size="medium"
          className="bg-gradient-to-tr from-[#BCBBFF] to-[#DAD9FF]"
        ></Widget>
        <Electricity></Electricity>
      </div>
    </div>
  );
}
