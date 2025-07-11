import { test, expect } from "vitest";
import { getUserType } from "../helper";

test('Get User Type: if user', async () => {
  expect(getUserType("user").type).toBe("/users");
});

test('Get User Profile: if user', async () => {
  expect(getUserType("user").profile).toBe("userProfile");
});

test('Get User Type: if artist', async () => {
  expect(getUserType("artist").type).toBe("/artists");
});

test('Get User Profile: if artist', async () => {
  expect(getUserType("artist").profile).toBe("artistProfile");
});