const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, request } = require('@playwright/test');

let apiContext;
let response;
let responseBody;

Given('I have a valid API endpoint', async () => {
  apiContext = await request.newContext();
});

When(
  'I send a POST request with name {string} and job {string}',
  async (name, job) => {

     
    response = await apiContext.post('https://reqres.in/api/users', {

      headers: {
            'Authorization': 'Bearer reqres_9452f03cf7f342a1b6eb9d0585b8fa9e'
        },

      data: {
        name: 'Shubhams',
        job: 'QA Engineer'
      }
    });

    responseBody = await response.json();
  }
);

Then('the response status code should be {int}', async (statusCode) => {
  expect(response.status()).toBe(statusCode);
});

Then('the response should contain name {string}', async (expectedName) => {
  expect(responseBody.name).toBe(expectedName);
});
