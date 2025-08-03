import type { HourlyForecastItem } from "@/api/getHourlyForecast";

export interface ChartDataItem {
  time: string;
  temperature: number;
}

export const processChartData = (
  data: HourlyForecastItem[],
): ChartDataItem[] => {
  return data.map((item) => {
    const date = new Date(item.dt * 1000);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateLabel = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return {
      time: `${time}, ${dateLabel}`,
      temperature: Math.round(item.main.temp),
    };
  });
};
