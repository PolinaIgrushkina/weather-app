import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SuggestionList, Suggestion } from "./SuggestionList";

describe("SuggestionList", () => {
  const suggestions: Suggestion[] = [
    { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin", country: "DE", lat: 52.52, lon: 13.405 },
  ];

  const onSelectMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders list of suggestions", () => {
    render(
      <SuggestionList suggestions={suggestions} onSelect={onSelectMock} />,
    );

    expect(screen.getByText("Paris, FR")).toBeInTheDocument();
    expect(screen.getByText("Berlin, DE")).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(suggestions.length);
  });

  it("calls onSelect with correct suggestion on mouse down", () => {
    render(
      <SuggestionList suggestions={suggestions} onSelect={onSelectMock} />,
    );

    const parisItem = screen.getByText("Paris, FR");

    fireEvent.mouseDown(parisItem);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(suggestions[0]);
  });
});
