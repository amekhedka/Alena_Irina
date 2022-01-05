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
        return $("a[href='/fillLoginCredentials']");
    }

    get alert() {
        return $(".MuiAlert-message.css-1w0ym84");
    }

    async signUp (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
    }

    async fillSignUpCredentials (email, password) {
        await this.open();
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
    }

    open () {
        return super.open('SignUp');
    }
}
module.exports = new SignUpPage();

