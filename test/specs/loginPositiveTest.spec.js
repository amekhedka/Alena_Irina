const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const MenuPage = require('../pageobjects/GlobalNavigation.page');
const {clearInput} = require('../../helpers/methods');
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");

describe('Login functionality', () => {

    before(() => {
        browser.maximizeWindow();
    });

    it('should login with valid credentials', async () => {
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.btnLogIn.click();
        //await expect(LoginPage.btnLogIn).toBeEnabled().false;      // проходит false  - не рабочая проверказадать вопрос
        await expect(PublicationsPage.publicationsTitle).toHaveText('publications');
    });

    it("The placeholder email contains the correct text", async () => {
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

    //corrected
    it("The placeholder for restore/signup contains the correct text", async () => {
        await LoginPage.open();
        await expect(LoginPage.restorePW_Placeholder).toHaveTextContaining("Forgot password?");
        await expect(LoginPage.signUpPlaceholder).toHaveTextContaining("Don't have an account?");
    });

    // to ask question
    it("Check clickable link on the login page", async () => {
        await LoginPage.open();
        await expect(LoginPage.hrefReset).toBeClickable();
        await expect(LoginPage.hrefSignup).toBeClickable();
    });

    it('Check clear input functionality', async () => {
        await LoginPage.fillLoginCredentials('bla.com', 'Manya111@');
        await clearInput(LoginPage.inputEmail);
        await LoginPage.inputEmail.setValue('Manya111@test.com');
        await LoginPage.btnLogIn.click();
        await expect(PublicationsPage.publicationsTitle).toHaveText('publications');
    });

    it('should logout and return back to login page', async () => {
        await GlobalNavigationPage.btnMenu.click();
        await GlobalNavigationPage.logOutOption.click();
        await expect(LoginPage.loginTitle).toHaveText('Login');
        //await expect(LoginPage.inputEmail).not.toHaveText().true;
    });
});

