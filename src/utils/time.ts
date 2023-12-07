export function getHourFromDate(date: any) {
  const newDate = new Date(date);
  return newDate.getHours().toString().padStart(2, "0");
}

export function getCurrentTime() {
  const now = new Date();

  return now.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getDayName(daysInFuture: number) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysInFuture);

  return daysOfWeek[futureDate.getDay()];
}
