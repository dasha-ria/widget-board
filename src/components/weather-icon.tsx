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
  WiFog,
} from "react-icons/wi";

type WeatherIconProps = {
  symbol:
    | "cloudy"
    | "partlycloudy_day"
    | "partlycloudy_night"
    | "lightsnow"
    | "snow"
    | "lightrain"
    | "rain"
    | "heavyrain"
    | "lightsleet"
    | "sleet"
    | "clearsky_day"
    | "clearsky_night"
    | "fair_day"
    | "fair_night"
    | "lightrainshowers_day"
    | "lightrainshowers_night"
    | "fog"
    | "fair_day";
  children?: React.ReactNode;
  className?: string;
};

export default function WeatherIcon({
  symbol,
  children,
  className,
}: WeatherIconProps) {
  switch (symbol) {
    case "cloudy":
      return <WiCloudy />;
    case "partlycloudy_day":
      return <WiDayCloudy></WiDayCloudy>;
    case "fair_day":
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
    case "heavyrain":
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
    case "fog":
      return <WiFog></WiFog>;

    default:
      return <span>{symbol}</span>;
  }
}
