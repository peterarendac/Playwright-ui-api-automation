import test, { expect } from '../../fixtures/basePages';

test.describe('Login', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await loginPage.goToLoginPage();
    })
        /* Happy Path */
        test('Successful Login', async ({ page, loginPage }) => {
            test.info().annotations.push({ type: 'Test', description: 'Login should succeed with valid credentials' });
            test.step('Enter valid username and password and click Login', async () => {
                await loginPage.login();
            });
            await expect(page, 'Failed to navigate to Swag Labs Page after successful login.').toHaveURL('https://www.saucedemo.com/inventory.html');
        });

        /* Unappy Paths */
        test('Cannot login with valid username and invalid password', async ({ page, loginPage }) => {
            test.info().annotations.push({ type: 'Test', description: 'Login should not succeed with valid username and invalid password' });
            test.step('Enter valid username and incorrect password and click Login', async () => {
                await loginPage.incorrectPassword();
            });
            await expect(loginPage.invalidUsernameAndPasswordErrorMessage, 'Can not find login error message.').toBeVisible();
        });

        test('Cannot login with invalid username and valid password', async ({ page, loginPage }) => {
            test.info().annotations.push({ type: 'Test', description: 'Login should not succeed with invalid username and valid password' });
            test.step('Enter invalid username and valid password and click Login', async () => {
                await loginPage.incorrectUserName();
            });
            await expect(loginPage.invalidUsernameAndPasswordErrorMessage, 'Cannot find login error message').toBeVisible();
        });

        test('Cannot login with no password', async ({ page, loginPage }) => {
            test.info().annotations.push({ type: 'Test', description: 'Login should not succeed with no password.' });
            test.step('Enter username and click Login without entering password', async () => {
                await loginPage.noPassword();
            });
            await expect(loginPage.noPasswordErrorMessage, 'Cannot find no password error message').toBeVisible();
        });

        test('Cannot login with no username', async ({ page, loginPage }) => {
            test.info().annotations.push({ type: 'Test', description: 'Login should not succeed with no username.' });
            test.step('Enter password and click Login without entering username', async () => {
                await loginPage.noUsername();
            });
            await expect(loginPage.noUsernameErrorMessage, 'Cannot find no username error message.').toBeVisible();
        });

        test('Cannot login with no credentials', async ({ page, loginPage }) => {
            test.info().annotations.push({ type: 'Test', description: 'Login should not succeed with no credentials.' });
            test.step('Click Login without entering username or password', async () => {
                await loginPage.noCredentials();
            });
            await expect(loginPage.noUsernameErrorMessage, 'Cannot find no username and password error message.').toBeVisible();
        });
});