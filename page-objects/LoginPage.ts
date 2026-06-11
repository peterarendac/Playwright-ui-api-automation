import { Locator, Page } from '@playwright/test';

export class LoginPage {
    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    invalidUsernameAndPasswordErrorMessage: Locator;
    noPasswordErrorMessage: Locator;
    noUsernameErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.invalidUsernameAndPasswordErrorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service');
        this.noPasswordErrorMessage = page.getByText('Epic sadface: Password is required');
        this.noUsernameErrorMessage = page.getByText('Epic sadface: Username is required');
    }

    async goToLoginPage() {
        await this.page.goto('/');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    /* Happy Path */
    async login() {
        await this.usernameInput.fill('standard_user');
        await this.passwordInput.fill('secret_sauce');
        await this.clickLoginButton();
    }

    /* Unhappy Paths */
    async incorrectUserName() {
        await this.usernameInput.fill('invalid_user');
        await this.passwordInput.fill('secret_sauce');
        await this.clickLoginButton();
    }

    async incorrectPassword() {
        await this.usernameInput.fill('standard_user');
        await this.passwordInput.fill('invalid_password');
        await this.clickLoginButton();
    }

    async noPassword() {
        await this.usernameInput.fill('standard_user');
        await this.passwordInput.fill('');
        await this.clickLoginButton();
    }

    async noUsername() {
        await this.usernameInput.fill('');
        await this.passwordInput.fill('secret_sauce');
        await this.clickLoginButton();
    }

    async noCredentials() {
        await this.usernameInput.fill('');
        await this.passwordInput.fill('');
        await this.clickLoginButton();
    }


}