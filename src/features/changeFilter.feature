Feature: Change Filter

Scenario : User should be able to change the filter
    Given User is on the Dashboard page
    When User selects a filter option
    Then User should see the filtered products on the Filter page
    When User selects a different filter option
    Then The new filter should be applied successfully