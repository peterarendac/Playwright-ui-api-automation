import test, { expect } from '../../fixtures/basePages';

test.describe('Swag Labs', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.login();
    });

    /* TC-02: User can add item to cart */
    test('Verify that user can add item to cart', async ({ swagLabsPage }) => {
        test.info().annotations.push({
            type: 'Add Item to cart',
            description: 'User should be able to add an item to the cart'
        });

        await test.step('Add item to cart', async () => {
            await swagLabsPage.clickOnAddToCartButton1();
        });

        await test.step('Verify item is added', async () => {
            await expect(swagLabsPage.locators.removeBackpack).toHaveText('Remove');
            await expect(swagLabsPage.locators.cartNumber).toHaveText('1');
        });
    });

    /* TC-03: User can remove item from cart */
    test('Verify that user can remove item from cart', async ({ swagLabsPage }) => {
        test.info().annotations.push({
            type: 'Remove Item from cart',
            description: 'User should be able to remove an item from the cart'
        });

        await test.step('Add item to cart', async () => {
            await swagLabsPage.clickOnAddToCartButton1();
        });

        await test.step('Remove item from cart', async () => {
            await swagLabsPage.clickOnRemoveFromCartButton();
        });

        await test.step('Verify item is removed', async () => {
            await expect(swagLabsPage.locators.addToCartBackpack).toHaveText('Add to cart');
            await expect(swagLabsPage.locators.cartNumber).toHaveCount(0);
        });
    });

    /* TC-04: User can complete checkout process */
    test('Checkout should display correct items and totals', async ({ swagLabsPage }) => {
        test.info().annotations.push({
            type: 'Complete Checkout',
            description: 'User should be able to complete the checkout process with correct items and totals'
        });

        await swagLabsPage.checkoutItems();

        await test.step('Verify items and totals', async () => {

            await expect(swagLabsPage.locators.cartNumber).toHaveText('2');

            const prices = await swagLabsPage.getItemPrices();
            expect(prices).toEqual([29.99, 9.99]);

            const itemTotal = prices.reduce((a, b) => a + b, 0);
            const tax = +(itemTotal * 0.08).toFixed(2);
            const expectedTotal = +(itemTotal + tax).toFixed(2);

            expect(await swagLabsPage.getItemTotal()).toBe(itemTotal);
            expect(await swagLabsPage.getTax()).toBe(tax);
            expect(await swagLabsPage.getTotal()).toBe(expectedTotal);
        });
    });

});
