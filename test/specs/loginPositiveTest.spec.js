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
            await LoginPage.btnLogIn.click();
            await expect(LoginPage.btnLogIn).toBeEnabled().true
            await expect(PublicationsPage.publicationsTitle).toHaveText('publications');

        });

        it("The placeholder email contains the correct text", async() => {
            await MenuPage.btnMenu.click();
            await MenuPage.logOutOption.click();
            await LoginPage.open();
            await expect(LoginPage.emailPlaceholder).toHaveText("Email *");
    });

        it("The placeholder password contains the correct text", async () => {
            await LoginPage.open();
            await expect(LoginPage.loginTitle).toHaveText("Login");
            await expect(LoginPage.PW_Placeholder).toHaveText("Password *");
    });

        it("The placeholder for restore/signup contains the correct text", async () => {
            await LoginPage.open();
            //await expect(LoginPage.restorePW_Placeholder).toHaveText("Forgot password?");
            await expect(LoginPage.signUpPlaceholder).toHaveText("Don`t have an account?");
    });

    //Todo:
    //     it("Check clickable link on the login page", async () => {
    //         await LoginPage.open();
    //         await expect(LoginPage.hrefReset).toBeClickable();
    //         await expect(LoginPage.hrefSignup).toBeClickable();
    //     });

  });

