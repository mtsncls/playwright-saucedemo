import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('valid login', async ({ page }) => {
  const login = new LoginPage(page);

  const username = process.env.STANDARD_USER;
  const password = process.env.COMMON_PASSWORD;
  
  if (!username || !password) {
    throw new Error('STANDARD_USER and COMMON_PASSWORD environment variables are required');
  }

  await login.goto();
  await login.login(username, password);
  await login.screenshot("valid-login.png");
  await expect(page).toHaveURL(/inventory/);
});

test('invalid login shows error', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('wrong', 'wrong');
  await login.screenshot("invalid-login.png");
  await expect(login.errorMessage).toBeVisible();
});
