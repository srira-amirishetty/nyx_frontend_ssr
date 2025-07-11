import { test, expect } from "vitest";
import { valueFull } from "../numberUtils"; // Assuming valueFull is in utils.js

test("valueFull multiplies numeric values by 100 and returns them as an array", async () => {
  const inputObj = { a: 1, b: "hello", c: 2.5 };
  const expectedOutput = [100, NaN, 250];

  const result = valueFull(inputObj);
  expect(result).toEqual(expectedOutput);
});

test("valueFull throws error for non-object input", async () => {
  // @ts-ignore
  expect(() => valueFull(123)).toThrow("Input must be a non-null object");
  // @ts-ignore
  expect(() => valueFull(null)).toThrow("Input must be a non-null object");
});

test("valueFull handles non-numeric values", async () => {
  const inputObj = { a: 1, b: "hello", c: "non-numeric" };
  const expectedOutput = [100, NaN, NaN];

  const result = valueFull(inputObj);
  expect(result).toEqual(expectedOutput);
});
