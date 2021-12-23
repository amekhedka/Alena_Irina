const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const GlobalNavigationPage = require('../pageobjects/GlobalNavigation.page');
const { clearInput } = require('../../helpers/methods');
const errorMessage = "Please fill out this field";
const pw_errorMessage = "Incorrect password";
const email_errorMessage = "User with provided email does not exist";

describe('Login functionality', () => {

        before(() => {
            browser.maximizeWindow();
        });

    describe('Login functionality - Positive test', () => {

        it('should login with valid credentials', async () => {
            await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
            await LoginPage.btnLogIn.click();
            await expect(LoginPage.btnLogIn).toBeEnabled().true
            await expect(PublicationsPage.publicationsTitle).toHaveText("publications");
        });
    });

    describe('Login functionality - Negative tests', () => {

        it('shouldn`t login with invalid credentials', async () => {
            await GlobalNavigationPage.btnMenu.click();
            await GlobalNavigationPage.logOutOption.click();
            await LoginPage.fillLoginCredentials('blabla', '$$$$');
            await LoginPage.btnLogIn.click();
            await expect(LoginPage.email_alert).toHaveText(email_errorMessage);
            await browser.refresh();
        });

        // it('shouldn`t login with empty fields', async () => {
        //     await LoginPage.fillLoginCredentials('', '');
        //     await LoginPage.btnLogIn.click();
        //
        // });
        //
        // it('shouldn`t login with empty Email', async () => {
        //     await GlobalNavigationPage.btnMenu.click();
        //     await GlobalNavigationPage.logOutOption.click();
        //     await LoginPage.fillLoginCredentials('', 'Manya111@');
        //     await LoginPage.btnLogIn.click();
        //
        // });
        //
        // it('shouldn`t login with empty PW', async () => {
        //     await GlobalNavigationPage.btnMenu.click();
        //     await GlobalNavigationPage.logOutOption.click();
        //     await LoginPage.fillLoginCredentials('Manya111@test.com', '');
        //     await LoginPage.btnLogIn.click();
        //
        // });
        //
        it('Login after refresh browser page', async () => {await GlobalNavigationPage.btnMenu.click();
            await GlobalNavigationPage.logOutOption.click();
            await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
            await browser.refresh();
            await LoginPage.btnLogIn.click();

        });
        //
        // it('Login after clearInput for Email', async () => {
        //     await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        //     await LoginPage.inputEmail.clearValue();
        //     await LoginPage.btnLogIn.click();
        //
        // });
        //
        // it('#2 Login after clearInput for Email', async () => {
        //     await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        //     await LoginPage.inputEmail.click();
        //     await clearInput(LoginPage.inputEmail);
        //     await LoginPage.btnLogIn.click();
        //     expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
        // });
        //
        //
        // it('#3 Login after clearInput for Email', async () => {
        //     await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        //     await LoginPage.inputEmail.getText();
        //     await LoginPage.inputEmail.Keys.DELETE
        //     await LoginPage.btnLogIn.click();
        //     expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
        // });
    });


    // describe('Login functionality - Verify placeholders', () => {
    //
    //     it("The placeholder email contains the correct text", () => {
    //         expect(LoginPage.emailPlaceholder).toHaveText("Email");
    //     });
    //
    //     it("The placeholder password contains the correct text", () => {
    //         expect(LoginPage.emailPlaceholder).toHaveText("Password");
    //     });
    // });
});