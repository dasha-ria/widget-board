type TemperatureSpanProps = {
  temperatures: number[];
  min: number;
  max: number;
};

function normalize(min: number, max: number, value: number) {
  return (value - min) / (max - min);
}

export default function TemperatureSpan({
  temperatures,
  min,
  max,
}: TemperatureSpanProps) {
  const globalMin = Math.min(...temperatures);
  const globalMax = Math.max(...temperatures);

  const normalizedMin =
    Math.min(normalize(globalMin, globalMax, min), 0.95) * 100;
  const normalizedMax =
    Math.max(normalize(globalMin, globalMax, max), 0.05) * 100;

  const length = normalizedMax - normalizedMin;

  return (
    <div className="w-[40%] h-1 bg-[#a9a7fc] rounded-full">
      <div
        className="bg-[#5c71ea] h-1 rounded-full"
        style={{
          width: `${length}%`,
          marginLeft: `${normalizedMin}%`,
        }}
      ></div>
    </div>
  );
}
