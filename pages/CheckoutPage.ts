import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(private page: Page) {
    this.firstName = this.page.locator('#first-name');
    this.lastName = this.page.locator('#last-name');
    this.postalCode = this.page.locator('#postal-code');
    this.continueButton = this.page.locator('#continue');
    this.finishButton = this.page.locator('#finish');
    this.successMessage = this.page.locator('.complete-header');
  }

  
  async fillInfo() {
    await this.firstName.fill('John');
    await this.lastName.fill('Doe');
    await this.postalCode.fill('12345');
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}
