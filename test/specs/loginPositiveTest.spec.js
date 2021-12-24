const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const MenuPage = require('../pageobjects/GlobalNavigation.page');
const { clearInput } = require('../../helpers/methods');

describe('Login functionality', () => {

        before(() => {
            browser.maximizeWindow();
        });

        it('should login with valid credentials', async () => {
            await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
            await LoginPage.clickLoginBtn();
            await expect(LoginPage.btnLogIn).toBeEnabled().true
            expect(PublicationsPage.publicationsTitle).toHaveText("publications");
            });
        it("The placeholder email contains the correct text", () => {
        expect(LoginPage.emailPlaceholder).toHaveText("Email");
    });

        it("The placeholder password contains the correct text", () => {
        expect(LoginPage.emailPlaceholder).toHaveText("Password");
    });
  });

