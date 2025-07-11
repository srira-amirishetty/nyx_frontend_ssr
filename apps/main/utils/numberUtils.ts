/**
 * Multiplies all numeric values of an object by 100 and returns them as an array.
 *
 * @description This function takes an object as input. It checks if the input is a non-null object. If not, it throws an error. Otherwise, it iterates over the object's values using `Object.values`, converts each value to a number, multiplies it by 100, and creates an array containing the scaled values. Finally, the function returns the array of scaled values.
 *
 * @param {Record<string, any>} obj - The object containing numeric values to be scaled.
 * @returns {Array<number>} An array containing the original numeric values of the object multiplied by 100.
 *
 * @throws {Error} If the input is not a non-null object.
 *
 * @example
 * const myObject = { a: 1, b: "hello", c: 2.5 };
 * const scaledValues = valueFull(myObject);
 * console.log(scaledValues); // Output: [100, 250] (assuming 'a' and 'c' are converted to numbers)
 */
export const valueFull = (obj: Record<string, any>): Array<number> => {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input must be a non-null object");
  }

  return Object.values(obj).map((item: number) => item * 100);
};
