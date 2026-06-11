import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { SwagLabsPage } from '../page-objects/SwagLabsPage';

const test = baseTest.extend<{
    loginPage: LoginPage;
    swagLabsPage: SwagLabsPage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    swagLabsPage: async ({ page }, use) => {
        await use(new SwagLabsPage(page));
    },
});

export default test;
export const { expect } = test;