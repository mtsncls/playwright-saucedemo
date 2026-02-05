import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// eslint-disable-next-line playwright/no-conditional-in-test
test('complete checkout flow', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  const username = process.env.STANDARD_USER;
  const password = process.env.COMMON_PASSWORD;
  
  // eslint-disable-next-line playwright/no-conditional-in-test
  if (!username || !password) {
    throw new Error('STANDARD_USER and COMMON_PASSWORD environment variables are required');
  }

  await login.goto();
  await login.login(username, password);

  await products.addFirstItem();
  await products.goToCart();

  await cart.checkout();
  await checkout.fillCheckoutForm({ firstName: 'Alice', lastName: 'Smith', postalCode: '90210' });
  await checkout.completeOrder();

  await expect(checkout.successMessage).toHaveText('Thank you for your orders!');
});
