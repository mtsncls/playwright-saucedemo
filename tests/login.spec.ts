import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('valid login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login(process.env.STANDARD_USER || 'standard_user', process.env.COMMON_PASSWORD || 'secret_sauce');
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
