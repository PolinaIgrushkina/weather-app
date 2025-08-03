import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddCityForm } from "../AddCityForm";
import * as api from "@/api/getCurrentWeather";
import * as store from "@/store/cityStore";

jest.mock("@/api/getCurrentWeather");
jest.mock("@/store/cityStore");

describe("AddCityForm", () => {
  const addCityMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (store.useCityStore as unknown as jest.Mock).mockReturnValue({
      addCity: addCityMock,
    });
  });

  it("adds city successfully", async () => {
    (api.getCurrentWeather as jest.Mock).mockResolvedValue({});

    render(<AddCityForm />);

    const input = screen.getByPlaceholderText(/enter a city/i);
    const button = screen.getByRole("button", { name: /add city/i });

    fireEvent.change(input, { target: { value: "Paris" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.getCurrentWeather).toHaveBeenCalledWith("Paris");
      expect(addCityMock).toHaveBeenCalledWith("Paris");
    });
  });

  it("handles error on adding city", async () => {
    (api.getCurrentWeather as jest.Mock).mockRejectedValue(new Error("fail"));

    render(<AddCityForm />);

    const input = screen.getByPlaceholderText(/enter a city/i);
    const button = screen.getByRole("button", { name: /add city/i });

    fireEvent.change(input, { target: { value: "UnknownCity" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.getCurrentWeather).toHaveBeenCalledWith("UnknownCity");
      expect(screen.getByText(/city not found/i)).toBeInTheDocument();
      expect(addCityMock).not.toHaveBeenCalled();
    });
  });
});
