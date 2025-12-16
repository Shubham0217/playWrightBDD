Feature: API testing

  Scenario: Create a user using POST API
    Given I have a valid API endpoint
    When I send a POST request with name "Shubhams" and job "QA Engineer"
    Then the response status code should be 201
    And the response should contain name "Shubhams"
