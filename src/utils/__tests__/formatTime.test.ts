import { formatTime } from "../formatTime";

describe("formatTime", () => {
  beforeAll(() => {
    jest
      .spyOn(Date.prototype, "toLocaleTimeString")
      .mockImplementation(function (this: Date) {
        const hours = this.getUTCHours();
        const minutes = this.getUTCMinutes();
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      });
  });

  afterAll(() => {
    (Date.prototype.toLocaleTimeString as jest.Mock).mockRestore();
  });

  it("formats timestamp correctly without timezone offset", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("formats timestamp correctly with positive timezone offset", () => {
    expect(formatTime(43200, 3600)).toBe("13:00");
  });

  it("formats timestamp correctly with negative timezone offset", () => {
    expect(formatTime(43200, -7200)).toBe("10:00");
  });
});
