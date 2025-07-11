export const filenameTrim = (
  name: string,
  max: number = 15,
  min: number = 8,
  last: number = 4
): string => {
  if (!name) {
    return name;
  }

  if (name.length > max) {
    return name.substring(0, min) + "..." + name.substring(name.length - last);
  }

  return name;
};
