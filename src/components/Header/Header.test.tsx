import React, { ImgHTMLAttributes } from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

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

describe("Header", () => {
  it("renders logo with correct alt and link", () => {
    render(<Header />);

    const logoImage = screen.getByAltText("Weather App Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/images/logo.svg");

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");

    expect(
      screen.getByText("Your personal weather dashboard"),
    ).toBeInTheDocument();
  });
});
