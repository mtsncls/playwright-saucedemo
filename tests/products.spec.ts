import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

// eslint-disable-next-line playwright/no-conditional-in-test
test('add item to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  const username = process.env.STANDARD_USER;
  const password = process.env.COMMON_PASSWORD;
  
  // eslint-disable-next-line playwright/no-conditional-in-test
  if (!username || !password) {
    throw new Error('STANDARD_USER and COMMON_PASSWORD environment variables are required');
  }

  await login.goto();
  await login.login(username, password);

  await products.addFirstItem();
  await expect(products.cartBadge).toHaveText('1');
});
