import { act } from "@testing-library/react";
import { useCityStore } from "./cityStore";

describe("useCityStore", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    act(() => {
      useCityStore
        .getState()
        .setCities([
          "Kyiv",
          "Dnipro",
          "Lviv",
          "Donetsk",
          "Istanbul",
          "Alanya",
          "London",
          "New York",
        ]);
    });
  });

  it("should initialize with default cities", () => {
    const cities = useCityStore.getState().cities;
    expect(cities).toEqual([
      "Kyiv",
      "Dnipro",
      "Lviv",
      "Donetsk",
      "Istanbul",
      "Alanya",
      "London",
      "New York",
    ]);
  });

  it("should add a city if not already present", () => {
    act(() => {
      useCityStore.getState().addCity("Berlin");
    });
    expect(useCityStore.getState().cities).toContain("Berlin");
  });

  it("should NOT add a duplicate city", () => {
    act(() => {
      useCityStore.getState().addCity("Kyiv");
    });
    const cities = useCityStore.getState().cities;
    const countKyiv = cities.filter((city) => city === "Kyiv").length;
    expect(countKyiv).toBe(1);
  });

  it("should remove a city", () => {
    act(() => {
      useCityStore.getState().removeCity("Lviv");
    });
    expect(useCityStore.getState().cities).not.toContain("Lviv");
  });

  it("should replace cities with setCities", () => {
    act(() => {
      useCityStore.getState().setCities(["Tokyo", "Seoul"]);
    });
    expect(useCityStore.getState().cities).toEqual(["Tokyo", "Seoul"]);
  });
});
