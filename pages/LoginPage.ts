import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  private screenShotPath: string = 'screenshots/';

  constructor(private page: Page) {
    this.username = this.page.locator('#user-name');
    this.password = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();

  }

  async screenshot(path: string) {
    await this.page.screenshot({ path: this.screenShotPath + path, fullPage: true });
  } 
}