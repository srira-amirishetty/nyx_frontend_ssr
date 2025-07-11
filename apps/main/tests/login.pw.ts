import { test, expect } from "@playwright/test";

test("Login:brand", async ({ page }) => {
  await page.goto("http://localhost:3000/brand");
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL("http://localhost:3000/apphome/login");
});

test("Login:lyrics/ai-lyrics-writer", async ({ page }) => {
  await page.goto("http://localhost:3000/lyrics/ai-lyrics-writer");
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL("http://localhost:3000/apphome/login");
});

test("Login:upload/reports", async ({ page }) => {
  await page.goto("http://localhost:3000/upload/reports");
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL("http://localhost:3000/apphome/login");
});

test("Login:upload/probability", async ({ page }) => {
  await page.goto("http://localhost:3000/upload/probability");
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL("http://localhost:3000/apphome/login");
});
