import { chromium, FullConfig } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.use.baseURL || process.env.BASE_URL || 'https://www.saucedemo.com';
  const username = process.env.STANDARD_USER || 'standard_user';
  const password = process.env.COMMON_PASSWORD || 'secret_sauce';
  const storagePath = 'storageState.json';

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
  await page.waitForURL(/inventory/);
  await page.context().storageState({ path: storagePath });
  await browser.close();
}