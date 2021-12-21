const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const MenuPage = require('../pageobjects/Menu.page');

describe('My Login application - Negative', () => {

    before(() => {
        browser.maximizeWindow();
    });

    it('should login with valid credentials', async () => {
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.clickLoginBtn();
        await expect(LoginPage.btnLogIn).toBeEnabled().true
        await expect(PublicationsPage.publicationsTitle).toHaveText("publications");
    });

    it ('shouldn`t login with invalid credentials',  async () => {
        await MenuPage.clickMenu();
        await MenuPage.clickLogOut();
        await LoginPage.fillLoginCredentials('blabla', '$$$$');
        await LoginPage.clickLoginBtn();
        await expect(LoginPage.errorMessage).toHaveText("User with provided email does not exist");
    });

    it ('shouldn`t login with empty fields',  async () => {
            await LoginPage.fillLoginCredentials ('', '');
            await LoginPage.clickLoginBtn();
            await expect(LoginPage.inputEmail).toString("Please fill out this field");

        });

});