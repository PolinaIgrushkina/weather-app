import { getWindDirection } from "./../getWindDirection";

describe("getWindDirection", () => {
  it("returns 'N/A' if deg is undefined", () => {
    expect(getWindDirection(undefined)).toBe("N/A");
  });

  it("returns correct cardinal directions", () => {
    expect(getWindDirection(0)).toBe("N");
    expect(getWindDirection(45)).toBe("NE");
    expect(getWindDirection(90)).toBe("E");
    expect(getWindDirection(135)).toBe("SE");
    expect(getWindDirection(180)).toBe("S");
    expect(getWindDirection(225)).toBe("SW");
    expect(getWindDirection(270)).toBe("W");
    expect(getWindDirection(315)).toBe("NW");
    expect(getWindDirection(360)).toBe("N");
  });

  it("correctly rounds degrees", () => {
    expect(getWindDirection(22)).toBe("N");
    expect(getWindDirection(23)).toBe("NE");
    expect(getWindDirection(67)).toBe("NE");
    expect(getWindDirection(112)).toBe("E");
    expect(getWindDirection(157)).toBe("SE");
  });
});
