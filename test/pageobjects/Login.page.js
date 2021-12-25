const Page = require('./Page');

class LoginPage extends Page {

    get inputEmail() {
        return $('#email');
    }

    get emailPlaceholder() {
        return $("#email-label");
    }

    get PW_Placeholder() {
        return $("#password-label");
    }

    get inputPassword() {
        return $('#password');
    }

    get btnLogIn() {
        return $("button[type='submit']");
    }

    get loginTitle() {
        return $("//h3[text()='Login']");
    }

    get PW_message() {
        return $("//div[text()='Incorrect password']")
    }

    get email_message() {
        return $("//div[text()='User with provided email does not exist']")
    }

    get errorMessage() {
        return $("//div[@class='MuiAlert-message css-1w0ym84']");
    }

    get hrefReset() {
        return $("//a[@href='/passwordReset']");
    }

    get hrefSignup() {
        return $("//a[@href='/signup']");
    }

    get restorePW_Placeholder() {
        return $("//div[contains(text(), 'Forgot password?')]");
    }
    get signUpPlaceholder() {
        return $('//div[contains(text(), "Don\'t have an account?")]');
    }

    async fillLoginCredentials (email, password) {
        await this.open();
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
    }

    open() {
        return super.open('/login');
    }
}
module.exports = new LoginPage();

