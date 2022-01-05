const SignUpPage = require('../pageobjects/SignUp.page');
const LoginData = require('../data/login.data');
// const LoginPage = require('../pageobjects/Login.page');
// const PublicationsPage = require("../pageobjects/Publications.page");
// const MenuPage = require('../pageobjects/GlobalNavigation.page');
// const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");


describe('Login functionality', () => {

    before(() => {
        browser.maximizeWindow();
    });

    // it("Shouldn`t be able to sign up with existing email", async () => {
    //     await SignUpPage.fillSignUpCredentials(LoginData.userCredentials.email, LoginData.userCredentials.password);
    //     await SignUpPage.btnSignUp.click();
    //     await browser.pause(2000);
    //     await
    //
    // });
});

