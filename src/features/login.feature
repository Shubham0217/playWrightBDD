Feature: Login

  Scenario: Login With Invalid Credentials
    Given user navigates to login page
    When user enters invalid credentials
    Then user should see an error message

  Scenario: Successful Login With Valid Credentials
    Given user navigates to login page
    When user enters valid credentials
    Then user should be logged in successfully
    Then user clicks on the hamburger menu and verify all the menu options
    Then user closes the hamburger menu
    Then user should be able to add all the products to the cart which has value less then 16$
    Then user scroll to the header
    Then user should be able to verify the number of items added in the cart badge
    Then user click on the cart icon
    Then user verify the products in the cart page
    Then user clicks on checkout button
    Then user enters the checkout details
    Then user verifies the total amount in the overview page
    Then user clicks on the finish button
    Then user verifies the thank you message on the completion page
    