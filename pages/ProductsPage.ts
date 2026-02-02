import { Page, Locator } from '@playwright/test';
import { title } from 'process';

export class ProductsPage {
  readonly title: Locator;
  readonly addToCartButtons: Locator;
  public readonly cartBadge: Locator;

  constructor(private page: Page) {
  this.title = this.page.locator('.title');
  this.addToCartButtons = this.page.locator('button[id*="add-to-cart"]');
  this.cartBadge = this.page.locator('.shopping_cart_badge');
  }

  async addFirstItem() {
    await this.addToCartButtons.first().click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getCartCount(): Promise<number> {
    const count = await this.cartBadge.count();
    if (count === 0) return 0;
    const text = await this.cartBadge.innerText();
    return parseInt(text.trim(), 10) || 0;
  }
}
