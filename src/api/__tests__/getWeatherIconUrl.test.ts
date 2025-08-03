import { getWeatherIconUrl } from "@/api/getWeatherIconUrl";

describe("getWeatherIconUrl", () => {
  it("returns correct URL for given icon code", () => {
    const iconCode = "10d";
    const expectedUrl = "https://openweathermap.org/img/wn/10d@2x.png";

    expect(getWeatherIconUrl(iconCode)).toBe(expectedUrl);
  });

  it("works with different icon codes", () => {
    expect(getWeatherIconUrl("01n")).toBe(
      "https://openweathermap.org/img/wn/01n@2x.png",
    );
    expect(getWeatherIconUrl("50d")).toBe(
      "https://openweathermap.org/img/wn/50d@2x.png",
    );
  });

  it("returns valid URL even for empty string", () => {
    expect(getWeatherIconUrl("")).toBe(
      "https://openweathermap.org/img/wn/@2x.png",
    );
  });
});
