import { expect, test, vi, beforeEach } from "vitest";
import { page } from "@vitest/browser/context";
import { verifyJWTToken } from "../utils";
import { hasToken } from "../auth"; // Import the function under test

beforeEach(() => {
  localStorage.clear(); // Clean up localStorage after each test
});

test("hasToken returns true when token exists and verification succeeds", async () => {
  await page.viewport(300, 500);
  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInBob25lIjoiODEyMzM0Mjg5NCIsImNvdW50cnlDb2RlIjoiOTEiLCJ0eXBlIjoiQVJUSVNUIiwiaWF0IjoxNzIzMjgxOTAzLCJleHAiOjE3MjMzNjgzMDN9.8Rvb9ttkgFtQ-LzINDD9vdGHa9cY9DBmVX6n23OPS8I"); // Set a token in localStorage
  expect(hasToken()).toBe(true);
});

test("returns false when a token exists but verification fails", () => {
  localStorage.setItem("token", "some-invalid-token");
  expect(hasToken()).toBe(false);
});

test("returns false when no token exists", () => {
  expect(hasToken()).toBe(false);
});
