import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddCityFormView from "../AddCityFormView";
import type { FormData } from "../AddCityForm";
import type { UseFormRegister } from "react-hook-form";

jest.mock("@/components/SuggestionList", () => ({
  SuggestionList: () => <div data-testid="suggestion-list" />,
}));

describe("AddCityFormView", () => {
  const registerMock: UseFormRegister<FormData> = (name) => ({
    name,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  });

  const onSubmitMock = jest.fn();
  const onInputChangeMock = jest.fn();
  const onSelectSuggestionMock = jest.fn();
  const setShowSuggestionsMock = jest.fn();

  const defaultProps = {
    register: registerMock,
    errors: {},
    isSubmitting: false,
    onSubmit: onSubmitMock,
    cityInput: "",
    onInputChange: onInputChangeMock,
    onSelectSuggestion: onSelectSuggestionMock,
    suggestions: [],
    showSuggestions: false,
    setShowSuggestions: setShowSuggestionsMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    render(<AddCityFormView {...defaultProps} />);
    expect(screen.getByPlaceholderText("Enter a city")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add city/i }),
    ).toBeInTheDocument();
  });

  it("calls onInputChange when typing in input", () => {
    render(<AddCityFormView {...defaultProps} />);
    const input = screen.getByPlaceholderText("Enter a city");
    fireEvent.change(input, { target: { value: "Paris" } });
    expect(onInputChangeMock).toHaveBeenCalled();
  });

  it("shows suggestions list when showSuggestions is true", () => {
    render(
      <AddCityFormView
        {...defaultProps}
        showSuggestions={true}
        suggestions={[{ name: "Paris", country: "FR", lat: 48, lon: 2 }]}
      />,
    );
    expect(screen.getByTestId("suggestion-list")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    render(<AddCityFormView {...defaultProps} />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(onSubmitMock).toHaveBeenCalled();
  });

  it("displays error message if errors.city exists", () => {
    const errorProps = {
      ...defaultProps,
      errors: { city: { message: "City is required", type: "manual" } },
    };
    render(<AddCityFormView {...errorProps} />);
    expect(screen.getByText("City is required")).toBeInTheDocument();
  });

  it("disables input and button when isSubmitting is true", () => {
    render(<AddCityFormView {...defaultProps} isSubmitting={true} />);
    expect(screen.getByPlaceholderText("Enter a city")).toBeDisabled();
    expect(screen.getByRole("button", { name: /add city/i })).toBeDisabled();
  });

  it("calls setShowSuggestions(true) on input focus if cityInput length >= 2", () => {
    render(
      <AddCityFormView
        {...defaultProps}
        cityInput="Paris"
        showSuggestions={false}
      />,
    );
    const input = screen.getByPlaceholderText("Enter a city");
    fireEvent.focus(input);
    expect(setShowSuggestionsMock).toHaveBeenCalledWith(true);
  });

  it("calls setShowSuggestions(false) after input blur (with delay)", () => {
    jest.useFakeTimers();
    render(<AddCityFormView {...defaultProps} />);
    const input = screen.getByPlaceholderText("Enter a city");
    fireEvent.blur(input);
    jest.advanceTimersByTime(150);
    expect(setShowSuggestionsMock).toHaveBeenCalledWith(false);
    jest.useRealTimers();
  });
});
