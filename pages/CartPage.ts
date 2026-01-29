import { Page, Locator } from '@playwright/test';

export class CartPage {

  readonly checkoutButton: Locator;

  constructor(private page: Page) {
    this.checkoutButton = this.page.locator('#checkout');
  }


  async checkout() {
    await this.checkoutButton.click();
  }
}
