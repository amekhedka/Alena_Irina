const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const MenuPage = require('../pageobjects/Menu.page');

describe('Login functionality', () => {

    describe('Login functionality - Positive tests', () => {

        before(() => {
            browser.maximizeWindow();
        });

        it('should login with valid credentials', async () => {
            await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
            await LoginPage.clickLoginBtn();
            await expect(LoginPage.btnLogIn).toBeEnabled().true
            expect(PublicationsPage.publicationsTitle).toHaveText("publications");
        });
    });

    describe('Login functionality - Negative tests', () => {

        it('shouldn`t login with invalid credentials', async () => {
            await MenuPage.clickMenu();
            await MenuPage.clickLogOut();
            await LoginPage.fillLoginCredentials('blabla', '$$$$');
            await LoginPage.clickLoginBtn();
            expect(LoginPage.errorMessage).toHaveText("User with provided email does not exist");
        });

        it('shouldn`t login with empty fields', async () => {
            await LoginPage.fillLoginCredentials('', '');
            await LoginPage.clickLoginBtn();
            expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
        });

        it('shouldn`t login with empty Email', async () => {
            await LoginPage.fillLoginCredentials('', 'Manya111@');
            await LoginPage.clickLoginBtn();
            expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
        });

        it('shouldn`t login with empty PW', async () => {
            await LoginPage.fillLoginCredentials('Manya111@test.com', '');
            await LoginPage.clickLoginBtn();
            expect(LoginPage.inputPassword).toString(LoginPage.errorMessage);
        });
    });
});