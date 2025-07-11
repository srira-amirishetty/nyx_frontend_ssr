import { test, expect } from "vitest";
import classNames from "../classNames";

test("classNames combines classNames", async () => {
  const classes = classNames("btn", "btn-primary");
  expect(classes).toBe("btn btn-primary"); // Adjust expectation based on clsx behavior
});

test("classNames merges tailwind classes with higher priority", async () => {
  const classes = classNames("btn", "hover:bg-blue-500", "text-red-500"); // tailwind after classNames
  expect(classes).toBe("btn hover:bg-blue-500 text-red-500"); // Adjust expectation based on twMerge behavior
});

test("classNames handles an empty array", async () => {
  const classes = classNames();
  expect(classes).toBe("");
});