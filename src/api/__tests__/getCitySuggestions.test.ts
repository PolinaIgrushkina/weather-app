import { getCitySuggestions } from "@/api/getCitySuggestions";
import fetchMock from "jest-fetch-mock";

describe("getCitySuggestions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches city suggestions successfully", async () => {
    const mockSuggestions = [
      { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
      { name: "Paris", country: "US", lat: 33.6609, lon: -95.5555 },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockSuggestions));

    const result = await getCitySuggestions("Paris");

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("q=Paris"));

    expect(result).toEqual(mockSuggestions);
  });

  it("throws an error if response is not ok", async () => {
    fetchMock.mockResponseOnce("Internal Server Error", { status: 500 });

    await expect(getCitySuggestions("Paris")).rejects.toThrow(
      "Error fetching city suggestions",
    );
  });

  it("encodes query properly", async () => {
    const cityWithSpaces = "New York";
    fetchMock.mockResponseOnce(JSON.stringify([]));

    await getCitySuggestions(cityWithSpaces);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("q=New%20York"),
    );
  });
});
