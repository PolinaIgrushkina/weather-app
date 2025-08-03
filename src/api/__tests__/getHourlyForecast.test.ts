import { getHourlyForecast } from "@/api/getHourlyForecast";
import fetchMock from "jest-fetch-mock";

describe("getHourlyForecast", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches hourly forecast and returns first 8 items", async () => {
    const mockData = {
      list: Array.from({ length: 10 }, (_, i) => ({
        dt: 1620000000 + i * 10800,
        main: {
          temp: 20 + i,
        },
      })),
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await getHourlyForecast("London");

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/forecast?q=London"),
    );

    expect(result).toHaveLength(8);
    expect(result[0].main.temp).toBe(20);
    expect(result[7].main.temp).toBe(27);
  });

  it("encodes city name properly", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ list: [] }));

    await getHourlyForecast("New York");

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("q=New%20York"),
    );
  });

  it("throws an error if fetch fails", async () => {
    fetchMock.mockResponseOnce("Internal Server Error", { status: 500 });

    await expect(getHourlyForecast("Paris")).rejects.toThrow(
      "Failed to fetch forecast: Internal Server Error",
    );
  });
});
