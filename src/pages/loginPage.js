const { getPage } = require('../utils/browserManager');

class LoginPage {
  async open() {
    this.page = getPage();
    await this.page.goto('https://www.saucedemo.com/');
  }
  
  async login(username, password) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async verifyLoginError() {
    await this.page.waitForSelector('[data-test="error"]');
    const errorText = await this.page.textContent('[data-test="error"]');
    if (!errorText || !errorText.includes('Epic sadface: Username and password do not match any user in this service')) {
      throw new Error('Expected error message not found');
    }
    
  }

  async verifyLogin() {
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForSelector('.inventory_list');
  }

  async verifyDashboardPage(){
    await this.page.waitForURL('**/inventory.html');
  }

  async clickHamburgerMenu() {
    await this.page.click('#react-burger-menu-btn');
  }

  async verifyMenuOptions() {
    const menuOptions = await this.page.$$eval('.bm-item', items => items.map(item => item.textContent));
    const expectedOptions = ['All Items', 'About', 'Logout', 'Reset App State'];
    if (JSON.stringify(menuOptions) !== JSON.stringify(expectedOptions)) {
      throw new Error('Menu options do not match');
    }
  }

  async closeHamburgerMenu() {
    await this.page.click('#react-burger-cross-btn');
  }

  async addAffordableProductsToCart(maxPrice) {
    const products = this.page.locator('.inventory_item');
    const count = await products.count();
    let addedCount = 0;

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const priceText = await product.locator('.inventory_item_price').textContent();
      const price = parseFloat(priceText.replace('$', ''));

      if (price <= maxPrice) {
        const addToCartButton = product.locator('.btn_inventory');
        await addToCartButton.click();
        addedCount++;
      }
    }

    return addedCount;
  }

  async scrollUpToHeader() {
    await this.page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    await this.page.waitForTimeout(500);
  }

  async getCartItemCount() {
    try {
      // Wait for the cart badge to appear with a reasonable timeout
      await this.page.waitForSelector('.shopping_cart_badge', { timeout: 10000 });
      const itemCountText = await this.page.textContent('.shopping_cart_badge');
      return parseInt(itemCountText, 10) || 0; 
    } catch (error) {
      // If badge doesn't exist, it means cart is empty
      console.log('Cart badge not found - cart is empty');
      return 0;
    }
  }

  async clickCartIcon() {
    await this.page.click('.shopping_cart_container');
  }

  async verifyProductsInCart(expectedProducts) {
    await this.page.waitForSelector('.cart_item');
    const cartItems = this.page.locator('.cart_item');
    const itemCount = await cartItems.count();

    if (itemCount !== expectedProducts.length) {
      throw new Error(`Expected ${expectedProducts.length} items in cart, but found ${itemCount}`);
    }

    // Verify each product name and price matches expected
    for (let i = 0; i < itemCount; i++) {
      const cartProductName = await cartItems.nth(i).locator('.inventory_item_name').textContent();
      const cartProductPriceText = await cartItems.nth(i).locator('.inventory_item_price').textContent();
      const cartProductPrice = parseFloat(cartProductPriceText.replace('$', ''));
      const expected = expectedProducts[i];
      if (cartProductName.trim() !== expected.name.trim() || cartProductPrice !== expected.price) {
        throw new Error(`Product mismatch in cart at index ${i}: expected ${expected.name} ($${expected.price}), found ${cartProductName} ($${cartProductPrice})`);
      }
    }
    return true;
  }

  async clickCheckoutButton() {
    await this.page.click('#checkout');
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async enterCheckoutDetails(firstName, lastName, postalCode) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
    await this.page.click('#continue');
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async verifyTotalAmount() {
    await this.page.waitForSelector('.summary_total_label');
    const totalText = await this.page.textContent('.summary_total_label');
    const totalAmount = parseFloat(totalText.replace('Total: $', ''));
    console.log(`Total amount in overview page: $${totalAmount}`);
    
    if (isNaN(totalAmount) || totalAmount <= 0) {
      throw new Error('Invalid total amount found');
    }
    
    return totalAmount;
  }

  async clickFinishButton() {
    await this.page.click('#finish');
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async verifyThankYouMessage() {
    await this.page.waitForSelector('.complete-header');
    const message = await this.page.textContent('.complete-header');
    if (!message || !message.includes('Thank you for your order!')) {
      throw new Error('Thank you message not found');
    }
    console.log('Order completed successfully!');
  }
}

module.exports = LoginPage;