import { render, screen, fireEvent } from "@testing-library/react";
import { CityCard } from "./CityCard";
import { useWeather } from "@/hooks/useCityWeather";
import "@testing-library/jest-dom";

jest.mock("@/hooks/useCityWeather");
const mockedUseWeather = useWeather as jest.Mock;

const mockWeatherData = {
  name: "Paris",
  sys: { country: "FR" },
  main: {
    temp: 21.5,
    feels_like: 20.1,
  },
  weather: [
    {
      icon: "10d",
      description: "light rain",
    },
  ],
};

describe("CityCard", () => {
  const onDeleteMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows skeleton when loading", () => {
    mockedUseWeather.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(<CityCard city="Paris" onDelete={onDeleteMock} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows error message if fetch failed", () => {
    mockedUseWeather.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });

    render(<CityCard city="Paris" onDelete={onDeleteMock} />);
    expect(screen.getByText(/error loading weather/i)).toBeInTheDocument();
  });

  it("renders weather data correctly", () => {
    mockedUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<CityCard city="Paris" onDelete={onDeleteMock} />);

    expect(screen.getByText("Paris, FR")).toBeInTheDocument();
    expect(screen.getByText(/Temperature 22°C/)).toBeInTheDocument();
    expect(screen.getByText(/Feels like 20°C/)).toBeInTheDocument();
    expect(screen.getByText(/light rain/)).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    mockedUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<CityCard city="Paris" onDelete={onDeleteMock} />);

    const deleteBtn = screen.getByRole("button", { name: /delete paris/i });
    fireEvent.click(deleteBtn);

    expect(onDeleteMock).toHaveBeenCalledWith("Paris");
  });

  it("calls refetch when update button is clicked", () => {
    const refetchMock = jest.fn();
    mockedUseWeather.mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      isError: false,
      refetch: refetchMock,
    });

    render(<CityCard city="Paris" onDelete={onDeleteMock} />);

    const updateBtn = screen.getByText(/update weather/i);
    fireEvent.click(updateBtn);

    expect(refetchMock).toHaveBeenCalled();
  });
});
