import { Locator, Page } from '@playwright/test';

export class SwagLabsPage {

    locators: {
        menu: Locator;
        title: Locator;
        itemCount: Locator;
        addToCartBackpack: Locator;
        addToCartBikeLight: Locator;
        removeBackpack: Locator;
        cartNumber: Locator;
        cartButton: Locator;
        checkoutButton: Locator;
        firstNameInput: Locator;
        lastNameInput: Locator;
        postalCodeInput: Locator;
        continueButton: Locator;
        itemPrices: Locator;
        itemTotal: Locator;
        tax: Locator;
        total: Locator;
    };

    constructor(private page: Page) {
        this.locators = {
            menu: page.locator('#react-burger-menu-btn'),
            title: page.getByText('Swag Labs'),
            itemCount: page.locator('#item_4_title_link'),

            addToCartBackpack: page.locator('#add-to-cart-sauce-labs-backpack'),
            addToCartBikeLight: page.locator('#add-to-cart-sauce-labs-bike-light'),
            removeBackpack: page.locator('#remove-sauce-labs-backpack'),

            cartNumber: page.locator('a.shopping_cart_link span'),
            cartButton: page.locator('a.shopping_cart_link'),

            checkoutButton: page.locator('#checkout'),
            firstNameInput: page.locator('#first-name'),
            lastNameInput: page.locator('#last-name'),
            postalCodeInput: page.locator('#postal-code'),
            continueButton: page.locator('#continue'),

            itemPrices: page.locator('.inventory_item_price'),
            itemTotal: page.locator('.summary_subtotal_label'),
            tax: page.locator('.summary_tax_label'),
            total: page.locator('.summary_total_label'),
        };
    }

    // Text prefixes for parsing totals
    labels = {
        itemTotal: 'Item total: $',
        tax: 'Tax: $',
        total: 'Total: $',
    };

    // Parse money values from text
    private parseMoney(text: string, prefix: string): number {
        return parseFloat(text.replace(prefix, ''));
    }


    async clickOnMenu() {
        await this.locators.menu.click();
    }

    async clickOnAddToCartButton1() {
        await this.locators.addToCartBackpack.click();
    }

    async clickOnRemoveFromCartButton() {
        await this.locators.removeBackpack.click();
    }

    // Complete checkout process with 2 items
    async checkoutItems() {
        await this.locators.addToCartBackpack.click();
        await this.locators.addToCartBikeLight.click();
        await this.locators.cartButton.click();
        await this.locators.checkoutButton.click();
        await this.locators.firstNameInput.fill('John');
        await this.locators.lastNameInput.fill('Doe');
        await this.locators.postalCodeInput.fill('12345');
        await this.locators.continueButton.click();
    }

    // Prices of items in the cart
    async getItemPrices(): Promise<number[]> {
        const prices = await this.locators.itemPrices.allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }

    // Total and tax from the checkout overview page
    async getItemTotal(): Promise<number> {
        const text = await this.locators.itemTotal.innerText();
        return this.parseMoney(text, this.labels.itemTotal);
    }

    async getTax(): Promise<number> {
        const text = await this.locators.tax.innerText();
        return this.parseMoney(text, this.labels.tax);
    }

    async getTotal(): Promise<number> {
        const text = await this.locators.total.innerText();
        return this.parseMoney(text, this.labels.total);
    }
}
