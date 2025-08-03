export const formatTime = (timestamp: number, timezoneOffset: number = 0) => {
  return new Date((timestamp + timezoneOffset) * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
