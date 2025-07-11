import { test, expect } from '@playwright/test';

const prod = true;
const BASE =  prod ? "https://nyx.today" : "http://localhost:3000"

test('Header Links ImageCraft Test', async ({ page }) => {
  await page.goto(BASE);
  await page.locator('#invest_dropdown').getByText('Products');
  // Open ImageCraft AI Link
  const imagecraft = await page.getByRole('link', { name: 'ImageCraft AI' });
  await imagecraft.click();
  await page.waitForURL(`${BASE}/image-craft-ai`);
  expect(page.locator("text=Why ImageCraft AI?")).toBeVisible;
});

test('Header Links Video Vista Test', async ({ page }) => {
  await page.goto(BASE);
  await page.locator('#invest_dropdown').getByText('Products');
  // Open ImageCraft AI Link
  const videoVista = await page.getByRole('link', { name: 'Videovista AI' });
  videoVista.click();
  await page.waitForURL(`${BASE}/video-vista-ai`);
  expect(page.locator("text=Who Can Use VideoVista AI?")).toBeVisible;
});

test('Header Links Sonic AI Test', async ({ page }) => {
  await page.goto(BASE);
  await page.locator('#invest_dropdown').getByText('Products');
  // Open ImageCraft AI Link
  const videoVista = await page.getByRole('link', { name: 'Sonic AI' });
  videoVista.click();
  await page.waitForURL(`${BASE}/sonic-ai`);
  expect(page.locator("text=Who can use Sonic AI?")).toBeVisible;
});

test('Header Links Lyrics Genius AI Test', async ({ page }) => {
  await page.goto(BASE);
  await page.locator('#invest_dropdown').getByText('Products');
  // Open ImageCraft AI Link
  const videoVista = await page.getByRole('link', { name: 'LyricGenius AI' });
  videoVista.click();
  await page.waitForURL(`${BASE}/lyrics-genius-ai`);
  expect(page.locator("text=Who can use LyricGenius AI?")).toBeVisible;
});