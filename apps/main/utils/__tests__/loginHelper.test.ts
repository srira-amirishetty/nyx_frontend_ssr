import { expect, test, assert, beforeEach } from "vitest";
import { getToken, removeToken } from "../loginHelper"; // Assuming auth.js is in the same directory
import { page } from "@vitest/browser/context";

beforeEach(() => {
  localStorage.clear();
});

test("getToken retrieves token from localStorage", async () => {
  await page.viewport(300, 500);
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInBob25lIjoiODEyMzM0Mjg5NCIsImNvdW50cnlDb2RlIjoiOTEiLCJ0eXBlIjoiQVJUSVNUIiwiaWF0IjoxNzIzMjgxOTAzLCJleHAiOjE3MjMzNjgzMDN9.8Rvb9ttkgFtQ-LzINDD9vdGHa9cY9DBmVX6n23OPS8I";
  localStorage.setItem("token", mockToken);
  const token = await getToken();
  expect(token).toBe(mockToken);
});

test("getToken rejects with error when no token exists", async () => {
  await page.viewport(300, 500);
  try {
    await getToken();
    // @ts-ignore
    assert.unreachable("Expected getToken to reject"); // Test should throw if it doesn't reject
  } catch (error) {
    expect(error).toBeFalsy();
  }
});

test("removeToken removes token and resolves with true", async () => {
  const result = await removeToken();
  expect(result).toBe(true);
});
