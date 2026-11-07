import { Page,Locator } from "@playwright/test";

class Cart{
    page:Page
    cartLink:Locator
    proceedToCheckoutBTN:Locator
    //placeOrderBTN:Locator

    constructor(page:Page){
        this.page=page
        this.cartLink=page.locator('(//a[@href="/view_cart"])[1]')
        this.proceedToCheckoutBTN=page.locator('.btn.btn-default.check_out')
        //this.placeOrderBTN=page.getByRole("link",{name:"Place Order",exact:true})
    }

    async proceedToCheckout(){
        await this.cartLink.click()
        await this.proceedToCheckoutBTN.click()
        //await this.placeOrderBTN.click()
    }
}

export default Cart