import{test,expect} from "@playwright/test"
import Register from "./PageObjectModel/registerPage.page"
import product from "./PageObjectModel/Productpage.page"
import Cart from "C:/Users/nihar/OneDrive/Desktop/PM-M18/tests/PageObjectModel/Cartpage.page.ts"
import Checkout from "./PageObjectModel/Checkoutpage.page"


test("purchage product",async({page})=>{

    let registerPage = new Register(page);
    let productPage = new product(page);
    let cartpage=new Cart(page)
    let checkoutPage = new Checkout(page)

    await registerPage.navigateToRegister();
    await registerPage.enterSignupDetails();
    await registerPage.fillAccountDetails();
    
    await productPage.addToCart();

    await cartpage.proceedToCheckout()

    await checkoutPage.checkout()
    await checkoutPage.verifyOrderMessage()
    await checkoutPage.InvoiceDownload()

})
