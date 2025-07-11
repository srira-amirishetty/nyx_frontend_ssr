import { test, expect } from '@playwright/test';

const prod = true;
const BASE =  prod ? "https://nyx.today/image-craft-ai" : "http://localhost:3000/image-craft-ai"

test('Image Craft Page Test', async ({ page }) => {
  await page.goto(BASE);
  for (let i = 0; i < 2; i++) {
    // Reload or Refresh Page
    await page.reload();
    await page.waitForTimeout(2000);
    await page.goto(BASE);
    const button = await page.getByRole('button', { name: 'Start for free' }).first()
    await expect(button.count()).toBeTruthy();
    const heading = await page.getByRole('heading', { name: 'Powered by' });
    heading.scrollIntoViewIfNeeded();
  }
});