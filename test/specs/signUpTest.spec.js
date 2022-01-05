const SignUpPage = require('../pageobjects/SignUp.page');
const LoginData = require('../data/login.data');

describe('Login functionality', () => {

    before(() => {
        browser.maximizeWindow();
    });

    it("Shouldn`t be able to sign up with existing email", async () => {
        await SignUpPage.fillSignUpCredentials(LoginData.userCredentials.email, LoginData.userCredentials.password);
        await SignUpPage.btnSignUp.click();
        await browser.pause(2000);
        const alertMsg = `User with ${LoginData.userCredentials.email} already exist`
        await expect(SignUpPage.alert).toHaveText(alertMsg);
    });
});

