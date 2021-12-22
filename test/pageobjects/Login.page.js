const Page = require('./Page');
const errorMessage = "Please fill out this field";


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

    get restorePWLink() {
        return $("a[href='/passwordReset']")
    }

    get signUpLink() {
        return $("a[href='/signup']")
    }

    get errorMessage() {
        return $("//div[@class='MuiAlert-message css-1w0ym84']");
    }

    async fillLoginCredentials (email, password) {
        await this.open();
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
    }
    clickLoginBtn() {
        this.btnLogIn.click();
    }

    clickSignUpLink () {
        this.signUpLink.click();
    }

    open() {
        return super.open('/login');
    }
}
module.exports = new LoginPage();

