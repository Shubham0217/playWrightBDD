Feature: Change Filter

Scenario : User should be able to change the filter
    Given User login using valid credentials
    When User is on the Dashboard page
    When User selects a filter option
    Then  user should be able to verify the options in the filter
    When User selects a different filter option
    Then The new filter should be applied successfully