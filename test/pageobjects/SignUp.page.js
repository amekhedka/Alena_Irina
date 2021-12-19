const Page = require('./Page');

class SignUpPage extends Page {

    get inputEmail() {
        return $("#email");
    }

    get inputPassword() {
        return $("#password");
    }

    get btnSignUp() {
        return $("button[type='submit']");
    }

    get loginLink() {
        return $("a[href='/login']")
    }

    async signUp (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSignUp.click();
    }

    clickLogin () {
        this.loginLink.click();
    }

    open () {
        return super.open('SignUp');
    }
}
module.exports = new SignUpPage();
