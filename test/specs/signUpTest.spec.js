const SignUpPage = require('../pageobjects/SignUp.page');
const LoginData = require('../data/login.data');
const LoginPage = require('../pageobjects/Login.page');

const invalidEmails = [
    "mysite.ourearth.com",
    "mysite@.com.my",
    "@you.me.net",
    "mysite123@gmail.b",
    "mysite@.org.org",
    ".mysite@mysite.org",
    "mysite()*@gmail.com",
    "mysite..1234@yahoo.com"
];

describe('SignUp Page', () => {

    before(() => {
        browser.maximizeWindow();
    });

    it("Shouldn`t be able to sign up with existing email", async () => {
        await SignUpPage.fillSignUpCredentials(LoginData.userCredentials.email, LoginData.userCredentials.password);
        await SignUpPage.btnSignUp.click();
        const alertMsg = `User with ${LoginData.userCredentials.email} already exist`
        await expect(SignUpPage.alert).toHaveText(alertMsg);
    });

    it("Should redirect the user from SignUp Page to Login Page and backwards", async () => {
        await SignUpPage.loginLink.click()
        await expect(LoginPage.loginTitle).toHaveText("Login");
        await LoginPage.hrefSignup.click();
        await expect(SignUpPage.signUpTitle).toHaveText("Sign Up");
    });

    it("Shouldn`t be able to sign up with incorrect email", async () => {
            for (let email of invalidEmails) {
                await SignUpPage.inputEmail.setValue(email);
                await SignUpPage.btnSignUp.click();
                const alertMsg = "Email validation error";
                await expect(SignUpPage.emailValidationError).toHaveText(alertMsg);
            }
        });
});
