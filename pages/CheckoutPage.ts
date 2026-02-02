import { Locator, Page } from '@playwright/test';

export interface CheckoutData {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}

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
  
  async fillCheckoutForm(data: CheckoutData = {}) {
    const { firstName = 'John', lastName = 'Doe', postalCode = '12345' } = data;
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }
}
