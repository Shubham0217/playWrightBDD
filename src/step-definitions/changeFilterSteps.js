const { Given, When, Then } = require('@cucumber/cucumber');

const LoginPage = require('../pages/loginPage.js');

const changeFilter = require('../pages/changeFilter.js');


Given('User login using vaid crenedtails', async()=>{

    const loginpage = new LoginPage();
    await loginpage.open();
    await loginpage.login('standard_user', 'secret_sauce');


})

When('User is on the Dashboard page'), async() =>{

    const changeFilter = new changeFilter();

    await changeFilter.verifyDashboardPage();

    await selectFilterOption('Price (low to high)');

}

Then ('user should be able to verify the options in the filter'), async()=>{

    const changeFilter = new changeFilter();

}


