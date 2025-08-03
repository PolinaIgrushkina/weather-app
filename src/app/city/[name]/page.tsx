import { getCurrentWeather, getHourlyForecast } from "@/api";
import { notFound } from "next/navigation";
import { WeatherSummary } from "@/components/WeatherSummary";
import { TemperatureChart } from "@/components/TemperatureChart";
import { Metadata } from "next";
import styles from "@/styles/pages/page.module.scss";

interface CityDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: CityDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const city = decodeURIComponent(resolvedParams.name);

  return {
    title: `Weather in ${city}`,
    description: `Get detailed weather information in ${city} for the next 24 hours.`,
  };
}

export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const resolvedParams = await params;
  const city = decodeURIComponent(resolvedParams.name);

  try {
    const [forecast, weatherSummaryData] = await Promise.all([
      getHourlyForecast(city),
      getCurrentWeather(city),
    ]);

    return (
      <>
        <section className={`${styles.main__section} section`}>
          <h1 className="title--02">
            Weather in <strong>{city}</strong> for the Next 24 Hours
          </h1>
          <WeatherSummary data={weatherSummaryData} />
          <TemperatureChart data={forecast} />
        </section>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return notFound();
  }
}
