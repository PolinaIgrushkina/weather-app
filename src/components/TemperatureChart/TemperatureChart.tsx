"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HourlyForecastItem } from "@/api/getHourlyForecast";
import { processChartData } from "./chartData";

interface TemperatureChartProps {
  data: HourlyForecastItem[];
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const chartData = processChartData(data);

  return (
    <>
      <h2 className="title--05">Temperature chart for the next 24 hours</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            tick={({ x, y, payload }) => {
              const [time, date] = payload.value.split("\n");
              return (
                <g transform={`translate(${x},${y + 10})`}>
                  <text x={0} y={0} textAnchor="middle" fill="#555353">
                    <tspan x={0} dy={0}>
                      {time}
                    </tspan>
                    <tspan x={0} dy={15}>
                      {date}
                    </tspan>
                  </text>
                </g>
              );
            }}
          />
          <YAxis unit="°C" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#021022",
              border: "1px solid #555",
              borderRadius: "8px",
              color: "#fff",
              transition: "opacity 0.35s ease",
              opacity: 1,
            }}
            labelStyle={{
              color: "#ccc",
              fontWeight: "bold",
            }}
            itemStyle={{
              color: "#ffd700",
            }}
            cursor={{ strokeWidth: 1 }}
            formatter={(value: number) => [`${value}°C`, "Temperature"]}
            labelFormatter={(label) => {
              const [time, date] = label?.split(", ") ?? [];
              return date ? `${time} (${date})` : label;
            }}
          />
          <Line
            type="linear"
            dataKey="temperature"
            stroke="#ffd700"
            strokeWidth={2}
            fill="none"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
