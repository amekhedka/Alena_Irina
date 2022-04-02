const LoginPage = require("../pageobjects/Login.page");
const PublicationPage = require('../pageobjects/Publications.page');
const LoginData = require('../data/login.data');
const { clearInput } = require('../helpers/uiMethods')
const SignUpPage = require("../pageobjects/SignUp.page");
const invalidEmails = [
    "emailgmail.com",
    "email@.com",
    "email@gmail",
    "%$#mysite123@gmail.com"
];
const alertMsg = "Incorrect username or password.";

describe("Login page", () => {

    before(async () => {
        await browser.setWindowSize(1650, 1050);
        await LoginPage.open();
    });
    it("TC-1: Verify the user shouldn`t be able to login with incorrect email", async () => {
        for (let email of invalidEmails) {
            await LoginPage.inputEmail.setValue(email);
            await LoginPage.inputPassword.setValue(LoginData.userCredentials.password);
            await LoginPage.btnLogin.click();
            await expect(LoginPage.errorMessage).toHaveText(alertMsg);
        }
    });

    it("TC-2: Verify the `Login` title is visible", async () => {
       await expect (LoginPage.loginTitle).toHaveText("Login")
    });

    it("TC-3: Verify the URL on the login page", async () => {
        await expect(browser).toHaveUrl("https://enduring.netlify.app/login")
    });

    it("TC-4: Verify the app title is `App` ", async () => {
        await expect(browser).toHaveTitle("App")
    });

    it("TC-5: Verify the user can clear input values in the fields", async () => {
        await LoginPage.open();
        let emptyEmailField = LoginPage.inputEmail.getValue();
        let emptyPasswordField = LoginPage.inputPassword.getValue();
        await LoginPage.inputEmail.setValue(LoginData.userCredentials.wrongEmail);
        await LoginPage.inputPassword.setValue(LoginData.userCredentials.wrongPassword);
        await clearInput(await LoginPage.inputEmail);
        await clearInput(await LoginPage.inputPassword);
        await expect(LoginPage.inputEmail.getValue()).toEqual(emptyEmailField);
        await expect(LoginPage.inputPassword.getValue()).toEqual(emptyPasswordField);
    });

    it("TC-6: Verify if user can log in with the valid credentials", async () => {
        await LoginPage.login(LoginData.userCredentials.email, LoginData.userCredentials.password);
        await expect(PublicationPage.publicationsTitle).toBeExisting();
        await expect(PublicationPage.publicationsTitle).toHaveTextContaining('publications');
    });
});
