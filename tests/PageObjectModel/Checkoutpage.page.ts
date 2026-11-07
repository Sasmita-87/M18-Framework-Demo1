
import { Locator, Page, expect } from "@playwright/test";
import data from "../DDT/userpayment.json"
import path from "path"
import fs from "fs"


class Checkout {

    page: Page;
    placeOrderBTN: Locator;
    CardName: Locator;
    CardNumber: Locator;
    CVC: Locator;
    month: Locator;
    year: Locator;
    confirmOrderBTN: Locator;
    orderMessage: Locator;
    downloadInvoice: Locator;
    continueBtn: Locator;

    constructor(page: Page) {

        this.page = page;
        this.placeOrderBTN = page.locator('.btn.btn-default.check_out')
        this.CardName = page.locator('//input[@data-qa="name-on-card"]')
        this.CardNumber = page.locator('//input[@data-qa="card-number"]')
        this.CVC = page.locator('//input[@data-qa="cvc"]')
        this.month = page.getByPlaceholder("MM", {exact: true})
        this.year = page.getByPlaceholder("YYYY", {exact: true });
        this.confirmOrderBTN = page.locator('#submit');
        this.orderMessage = page.locator('//p[contains(text(),"Congratulations")]');
        this.downloadInvoice = page.locator('.btn.btn-default.check_out')
        this.continueBtn = page.locator('//a[@data-qa="continue-button"]')
    }

    async checkout(){
       await this.placeOrderBTN.click()
        await this.CardName.fill(data.NameOnCard)
       await this.CardNumber.fill(data.CardNumber)
       await this.CVC.fill(data.CVC)
      await  this.month.fill(data.ExpiryMonth)
      await  this.year.fill(data.Expiryyear)
        await this.confirmOrderBTN.click()
    }

    async verifyOrderMessage(){
        await expect(this.orderMessage).toContainText(data.orderMessage)
    }
    
    async InvoiceDownload(){
        let [downloadfile]=await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadInvoice.click()
        ])

        let downloadfolder="C:/Users/nihar/OneDrive/Desktop/PM-M18/tests/downloadfile"
        let filename=await downloadfile.suggestedFilename()
        await downloadfile.saveAs(path.join(downloadfolder,filename))
        let filepath=path.join(downloadfolder,filename)
        let data=fs.readFileSync(filepath,'utf-8')
        await expect(data).toContain("Thank you")
        await this.continueBtn.click()
    }

}

export default Checkout
