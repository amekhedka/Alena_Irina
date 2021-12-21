const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");

describe('My Login application', () => {

    before(() => {
        browser.maximizeWindow();
    });

    it ('should login with valid credentials',  async () => {
        await LoginPage.fillLoginData ('Manya111@test.com', 'Manya111@');
        await LoginPage.clickLoginBtn();
        await expect(LoginPage.btnLogIn).toBeEnabled().true
        await expect(PublicationsPage.publicationsTitle).toHaveText("publications");
    });
});