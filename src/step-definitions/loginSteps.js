const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage.js');

const loginPage = new LoginPage();

Given('user navigates to login page', async () => {
  await loginPage.open();
});

When('user enters invalid credentials', async () => {
  await loginPage.login('invalid_user', 'invalid_pass');
});

Then('user should see an error message', async () => {
  await loginPage.verifyLoginError();
});

When('user enters valid credentials', async () => {
  await loginPage.login('standard_user', 'secret_sauce');
});

Then('user should be logged in successfully', async () => {
  await loginPage.verifyLogin();
});

Then('user clicks on the hamburger menu and verify all the menu options', async () => {
  await loginPage.clickHamburgerMenu();
  await loginPage.verifyMenuOptions();
});

Then('user closes the hamburger menu', async () => {
  await loginPage.closeHamburgerMenu();
});

Then('user should be able to add the product to the cart which has value less then 16$', async () => {
  const added = await loginPage.addAffordableProductToCart(16);
  if (!added) {
    throw new Error('No affordable product was added to the cart');
  }
});

Then('user should be able to verify the number of items in the cart icon increases upon adding a product', async () => {
  const itemCount = await loginPage.getCartItemCount();
  const added = await loginPage.addAffordableProductToCart(16);
  if (!added) {
    throw new Error('No affordable product was added to the cart');
  }
  const updatedItemCount = await loginPage.getCartItemCount();
  if (updatedItemCount !== itemCount + 1) {
    throw new Error('Cart item count did not increase');
  }
});


Then('user should be able to add all the products to the cart which has value less then {int}$', async function (maxPrice) {
  const products = await loginPage.page.locator('.inventory_item');
  let addedCount = 0;
  
  for (let i = 0; i < await products.count(); i++) {
    const product = products.nth(i);
    
    
    await product.scrollIntoViewIfNeeded();
    await loginPage.page.waitForTimeout(200); 
    
    const priceText = await product.locator('.inventory_item_price').textContent();
    const price = parseFloat(priceText.replace('$', ''));
    
    if (price <= maxPrice) {
      const addToCartButton = product.locator('.btn_inventory');
      await addToCartButton.waitFor({ state: 'visible' });
      await addToCartButton.click();
      
      addedCount++;
      
      await loginPage.page.waitForTimeout(100);
    }
  }
  
  if (addedCount === 0) {
    throw new Error('No affordable products were added to the cart');
  }
  
  console.log(`Added ${addedCount} products to cart`);
  
  
  this.expectedCartCount = addedCount;
});


Then('user should be able to add all the products to the cart which has value less then {int}$ and verify in cart', async function (maxPrice) {
  const addedCount = await loginPage.addAffordableProductsToCart(maxPrice);
  await loginPage.clickCartIcon();
  await loginPage.verifyProductsInCart(addedCount);
});

Then('user scroll to the header', async () => {
  await loginPage.scrollUpToHeader();
});

Then('user should be able to verify the number of items added in the cart badge', async function () {
  
  if (!loginPage.page) {
    throw new Error('LoginPage not properly initialized');
  }
  
  
  const badgeCount = await loginPage.getCartItemCount();
  console.log(`Cart badge shows ${badgeCount} items`);
  
  
  if (this.expectedCartCount !== undefined && badgeCount !== this.expectedCartCount) {
    throw new Error(`Expected cart badge to show ${this.expectedCartCount} items, but it shows ${badgeCount}`);
  }
  
 
  this.cartBadgeCount = badgeCount;
});

Then('user click on the cart icon', async () => {
  await loginPage.clickCartIcon();
});

Then ('user verify the products in the cart page', async function () {
  
  await loginPage.page.waitForSelector('.cart_item', { timeout: 10000 });
  
  
  const cartItems = await loginPage.page.locator('.cart_item').count();
  console.log(`Found ${cartItems} items in cart page`);
  
  
  if (this.cartBadgeCount !== undefined && cartItems !== this.cartBadgeCount) {
    throw new Error(`Expected ${this.cartBadgeCount} items in cart, but found ${cartItems}`);
  }
  
  
  if (cartItems === 0) {
    throw new Error('No items found in cart page');
  }
});


Then ('user clicks on checkout button', async  () => {
  await loginPage.clickCheckoutButton();
});

Then ('user enters the checkout details', async () => {
  await loginPage.enterCheckoutDetails('John', 'Doe', '12345');
});

Then ('user verifies the total amount in the overview page', async () => {
  await loginPage.verifyTotalAmount();
});
  
Then ('user clicks on the finish button', async () => {
  await loginPage.clickFinishButton();
});

Then ('user verifies the thank you message on the completion page', async () => {
  await loginPage.verifyThankYouMessage();
});

