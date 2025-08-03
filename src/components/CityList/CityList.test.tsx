import React, { ImgHTMLAttributes } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CityList } from "@/components/CityList/CityList";
import { useCityStore } from "@/store/cityStore";
import { useWeather } from "@/hooks/useCityWeather";

jest.mock("@/store/cityStore", () => ({
  useCityStore: jest.fn(),
}));

jest.mock("@/hooks/useCityWeather", () => ({
  useWeather: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,

  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("CityList", () => {
  const mockWeatherData = {
    name: "Paris",
    sys: { country: "FR" },
    main: { temp: 20, feels_like: 18 },
    weather: [{ description: "sunny", icon: "01d" }],
  };

  it("renders CityCard with weather data", () => {
    const removeCityMock = jest.fn();

    (useCityStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ cities: ["Paris"], removeCity: removeCityMock }),
    );

    (useWeather as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<CityList />);

    expect(screen.getByText(/Paris, FR/)).toBeInTheDocument();
    expect(screen.getByText(/Temperature 20°C/)).toBeInTheDocument();
    expect(screen.getByText(/Feels like 18°C/)).toBeInTheDocument();
    expect(screen.getByText(/sunny/i)).toBeInTheDocument();
  });

  it("calls removeCity when delete button is clicked", () => {
    const removeCityMock = jest.fn();

    (useCityStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ cities: ["Paris"], removeCity: removeCityMock }),
    );

    (useWeather as jest.Mock).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<CityList />);
    const deleteButton = screen.getByLabelText("Delete Paris");
    fireEvent.click(deleteButton);

    expect(removeCityMock).toHaveBeenCalledWith("Paris");
  });

  it("shows skeleton while loading", () => {
    (useCityStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ cities: ["Paris"], removeCity: jest.fn() }),
    );

    (useWeather as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(<CityList />);
    // замените test-id, если в вашем CardSkeleton он другой
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows error state if loading fails", () => {
    (useCityStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ cities: ["Paris"], removeCity: jest.fn() }),
    );

    (useWeather as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });

    render(<CityList />);
    expect(
      screen.getByText("Error loading weather for Paris"),
    ).toBeInTheDocument();
  });

  it("renders nothing if city list is empty", () => {
    (useCityStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ cities: [], removeCity: jest.fn() }),
    );

    render(<CityList />);
    expect(screen.queryByText(/Temperature/)).toBeNull();
  });

  it("removes multiple cities one by one", () => {
    const removeCityMock = jest.fn();

    (useCityStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ cities: ["Paris", "Berlin"], removeCity: removeCityMock }),
    );

    (useWeather as jest.Mock).mockImplementation((city: string) => ({
      data: {
        name: city,
        sys: { country: city === "Paris" ? "FR" : "DE" },
        main: { temp: 25, feels_like: 23 },
        weather: [{ description: "clear sky", icon: "01d" }],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    }));

    render(<CityList />);

    const deleteParis = screen.getByLabelText("Delete Paris");
    const deleteBerlin = screen.getByLabelText("Delete Berlin");

    fireEvent.click(deleteParis);
    expect(removeCityMock).toHaveBeenCalledWith("Paris");

    fireEvent.click(deleteBerlin);
    expect(removeCityMock).toHaveBeenCalledWith("Berlin");

    expect(removeCityMock).toHaveBeenCalledTimes(2);
  });
});
