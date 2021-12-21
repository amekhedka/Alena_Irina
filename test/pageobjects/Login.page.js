const Page = require('./Page');

class LoginPage extends Page {

    get inputEmail() {
        return $('#email');
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

    async fillLoginData (email, password) {
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

