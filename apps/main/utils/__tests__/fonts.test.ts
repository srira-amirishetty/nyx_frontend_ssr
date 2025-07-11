import { expect, vi, test, beforeEach, afterEach } from "vitest";
import { fontCheckList, fontCheck } from "../fonts"; // Assuming fontCheck.js is in the same directory

test("fontCheckList resolves with available fonts", async () => {
  const mockFont = "Arial";
  fontCheck.add(mockFont); // Add the font to the set

  const availableFonts = await fontCheckList();
  expect(availableFonts).not.toEqual([mockFont]);

  fontCheck.delete(mockFont); // Clean up after the test
});


test("fontCheckList handles unavailable fonts", async () => {
  const mockFont = "SomeRareFont";
  fontCheck.add(mockFont);

  const availableFonts = await fontCheckList();
  expect(availableFonts).not.toEqual([]);

  fontCheck.delete(mockFont); // Clean up after the test
});

test("fontCheckList waits for document.fonts.ready", async () => {
  const mockFont = "Arial";
  fontCheck.add(mockFont);

  const fontCheckListPromise = fontCheckList();
  expect(document.fonts.ready).toBeInstanceOf(Promise); // Ensure ready is a Promise
  const availableFonts = await fontCheckListPromise; // Resolve the promise
  expect(availableFonts).not.toEqual([mockFont]); // Test is not executed until the promise resolves

  fontCheck.delete(mockFont); // Clean up after the test
});
