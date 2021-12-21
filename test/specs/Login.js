const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require ("../pageobjects/Publications.page")

describe('My Login application', () => {

    it ('should login with valid credentials',  async () => {
        await LoginPage.fillLoginData ('Manya111@test.com', 'Manya111@');
        await LoginPage.clickLoginBtn();
    });
    it("Login button is enabled", async () => {
        const elem = $('//button[@type="submit"]')
        await expect(elem).toBeEnabled().true

    })
    it ("Should redirect on Publication Page", async () => {
        await expect(PublicationsPage.publicationsTitle).toHaveText("publications");
        await expect(PublicationsPage.publicationsTitle).toBeExisting().true
    });
});