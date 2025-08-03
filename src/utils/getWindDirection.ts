export const getWindDirection = (deg: number | undefined) => {
  if (deg === undefined) return "N/A";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.floor((deg + 22.5) / 45) % 8;
  return directions[index];
};
