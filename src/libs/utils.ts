export const isNumeric = (value: string) => {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};
