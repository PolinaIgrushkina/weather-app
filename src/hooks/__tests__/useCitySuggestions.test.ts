import { renderHook, act, waitFor } from "@testing-library/react";
import { useCitySuggestions } from "../useCitySuggestions";
import * as api from "@/api/getCitySuggestions";

jest.useFakeTimers();

jest.mock("@/api/getCitySuggestions", () => ({
  getCitySuggestions: jest.fn(),
}));

describe("useCitySuggestions", () => {
  const mockSuggestions = [
    { name: "Kyiv", country: "UA", lat: 50, lon: 30 },
    { name: "Kyivskyi", country: "UA", lat: 50.1, lon: 30.1 },
  ];

  beforeEach(() => {
    (api.getCitySuggestions as jest.Mock).mockResolvedValue(mockSuggestions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not fetch if input length < 2", async () => {
    const { result } = renderHook(() => useCitySuggestions("a", false));

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toBe(false);

    act(() => {
      jest.runAllTimers();
    });

    expect(api.getCitySuggestions).not.toHaveBeenCalled();
  });

  it("does not fetch if hasSelectedSuggestion is true", async () => {
    const { result } = renderHook(() => useCitySuggestions("Kyiv", true));

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toBe(false);

    act(() => {
      jest.runAllTimers();
    });

    expect(api.getCitySuggestions).not.toHaveBeenCalled();
  });

  it("fetches suggestions after 400ms debounce when input is valid", async () => {
    const { result } = renderHook(() => useCitySuggestions("Kyiv", false));

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toBe(false);

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => {
      expect(result.current.suggestions).toEqual(mockSuggestions);
      expect(result.current.showSuggestions).toBe(true);
    });

    expect(api.getCitySuggestions).toHaveBeenCalledWith("Kyiv");
  });

  it("handles error from getCitySuggestions gracefully", async () => {
    (api.getCitySuggestions as jest.Mock).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useCitySuggestions("Kyiv", false));

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => {
      expect(result.current.suggestions).toEqual([]);
      expect(result.current.showSuggestions).toBe(false);
    });
  });
});
