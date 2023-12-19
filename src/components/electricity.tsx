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

  todayPrice[2].total = -0.6;
  todayPrice[3].total = -0.4;

  const maxPrice = Math.max(...todayPrice.map((price) => price.total));
  const minPrice = Math.min(...todayPrice.map((price) => price.total), 0);

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

  return (
    <Widget
      size="medium"
      className="bg-gradient-to-tr from-[#BCBBFF] to-[#DAD9FF] flex items-center justify-center px-2 py-4"
    >
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
            }}
          ></div>

          {index % 2 === 0 ? (
            <p className="text-center text-xs">
              {String(index).padStart(2, "0")}
            </p>
          ) : (
            <p className="text-center text-xs invisible">00</p>
          )}
        </div>
      ))}
    </Widget>
  );
}
