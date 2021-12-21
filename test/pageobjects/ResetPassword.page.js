const Page = require ("/Page");

class ResetPasswordPage extends Page {

    get btnSend() {
        return $("button[type='submit']");
    }

    get backToLoginLink() {
        return $("a[href='/login']");
    }

    fillEmailField (email) {
        this.inputEmail.setValue(email);
    }

    clickSend () {
        this.btnSend.click();
    }

    clickBackToLogin () {
        this.backToLoginLink.click();
    }

    open() {
        return super.open('/passwordReset');
    }
}

module.exports = new ResetPasswordPage();