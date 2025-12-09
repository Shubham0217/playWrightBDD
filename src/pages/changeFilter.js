const { getPage } = require('../utils/browserManager');


class changeFilter {

    async verifyDashboardPage(){
        this.page = getPage();
        await this.page.waitForURL('**/inventory.html');
    }

    async selectFilterOption(optionText){
        const filterBtn = await this.page.locator('product-sort-container')
        await filterBtn.click();
        const option = await this.page.locator(`.product_sort_container >> text=${optionText}`);
        await option.click();

    }

    async verifyFilterOptions(){

        await expect(this.page.getByText('Name (A to Z)')).toBeVisible();


    }

}