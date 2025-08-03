import { getCurrentWeather } from "../getCurrentWeather";

describe("getCurrentWeather", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("returns weather data when fetch is successful", async () => {
    const mockResponse = {
      name: "London",
      main: { temp: 20 },
      weather: [{ description: "clear sky" }],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await getCurrentWeather("London");

    expect(data).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("q=London"));
  });

  it("throws error when fetch response is not ok", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    await expect(getCurrentWeather("London")).rejects.toThrow(
      "Error fetching weather data",
    );
  });
});
