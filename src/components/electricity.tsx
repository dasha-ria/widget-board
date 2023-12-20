import { getHourFromDate } from "@/utils/time";
import Widget from "./widget";

export default async function Electricity() {
  const response = await fetch("https://api.tibber.com/v1-beta/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TIBBER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        viewer {
          homes {
            dailyConsumption: consumption(resolution: HOURLY, last: 24) {
              nodes {
                from
                to
                cost
                unitPrice
                unitPriceVAT
                consumption
                consumptionUnit
              }
            }
            monthlyConsumption: consumption(resolution: DAILY, last: 31) {
              nodes {
                from
                to
                cost
                unitPrice
                unitPriceVAT
                consumption
                consumptionUnit
              }
            }
            currentSubscription{
              priceInfo{
                today {
                  total
                  energy
                  tax
                  startsAt
                }
              }
              
            }
          }
        }
      }
      
      `,
    }),
  });

  const { data } = await response.json();

  const todayPrice = data.viewer.homes[0].currentSubscription.priceInfo.today;

  const maxPrice = Math.max(...todayPrice.map((price) => price.total));
  const minPrice = Math.min(...todayPrice.map((price) => price.total), 0);
  const firstQuartile = (maxPrice + minPrice) * 0.33;
  const secondQuartile = (maxPrice + minPrice) * 0.66;

  function normalize(min: number, max: number, value: number) {
    return (value - min) / (max - min);
  }

  function getPriceColor(price) {
    if (price < 0) {
      return "blue";
    } else if (price > 5) {
      return "black";
    } else if (price > 1.5) {
      return "red";
    } else if (price > 0.8) {
      return "orange";
    }
    return "green";
  }

  function convertToOre(num: number) {
    return Math.round(num * 100);
  }

  function chartFadeColor(hour) {
    let currentHour = parseInt(getHourFromDate(new Date()));
    if (hour <= currentHour) {
      return {
        opacity: "60%",
      };
    }
  }

  return (
    <Widget
      size="medium"
      className="bg-gradient-to-tr from-[#BCBBFF] to-[#DAD9FF] flex justify-between items-center px-2"
    >
      <div className="flex flex-col justify-between h-full pt-2 pb-7">
        <p className="text-xs">{convertToOre(maxPrice)}</p>
        <p className="text-xs">{convertToOre(secondQuartile)}</p>
        <p className="text-xs">{convertToOre(firstQuartile)}</p>
        <p className="text-xs">{convertToOre(minPrice)}</p>
      </div>
      <div className="flex flex-col h-full py-4 gap-2">
        <div className="flex items-center h-full justify-center relative">
          <div className="h-[1px] w-full bg-black/20 absolute top-0"></div>
          <div className="h-[1px] w-full bg-black/20 absolute top-[33%]"></div>
          <div className="h-[1px] w-full bg-black/20 absolute top-[66%]"></div>
          {todayPrice.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-end h-full"
            >
              <div
                className="w-4"
                style={{
                  height: normalize(minPrice, maxPrice, item.total) * 100 + "%",
                  backgroundColor: getPriceColor(item.total),
                  ...chartFadeColor(index),
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {todayPrice.map((item, index) => (
            <div key={index} className="flex flex-col">
              {index % 2 === 0 ? (
                <p className="text-center text-xs leading-none">
                  {String(index).padStart(2, "0")}
                </p>
              ) : (
                <p className="text-center text-xs invisible leading-none">00</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
}
