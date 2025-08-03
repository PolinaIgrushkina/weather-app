import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { renderHook, waitFor } from "@testing-library/react";
import { useWeather } from "../useCityWeather";
import * as getCurrentWeatherApi from "@/api/getCurrentWeather";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ReactQueryProvider>{children}</ReactQueryProvider>
);

const mockWeatherData = {
  id: 123,
  name: "London",
  sys: { country: "GB" },
  main: { temp: 15, feels_like: 13 },
  weather: [{ icon: "01d", description: "Clear sky" }],
};

jest.mock("@/api/getCurrentWeather", () => ({
  getCurrentWeather: jest.fn(),
}));

describe("useWeather", () => {
  beforeEach(() => {
    (getCurrentWeatherApi.getCurrentWeather as jest.Mock).mockResolvedValue(
      mockWeatherData,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and returns weather data", async () => {
    const { result } = renderHook(() => useWeather("London"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockWeatherData);
    expect(getCurrentWeatherApi.getCurrentWeather).toHaveBeenCalledWith(
      "London",
    );
  });

  it("handles loading state", async () => {
    const { result } = renderHook(() => useWeather("London"), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
