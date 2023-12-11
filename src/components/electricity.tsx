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
                current{
                  total
                  energy
                  tax
                  startsAt
                }
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
}
