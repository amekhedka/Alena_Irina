const Page = require ("/Page");

class ResetPasswordPage extends Page {

    get inputEmail() {
        return $('#email');
    }

    get btnSend() {
        return $("button[type='submit']")
    }

    get backToLoginLink() {
        return $("a[href='/login']")
    }

    fillEmailField (email) {
        this.inputEmail.setValue(email)
    }

    clickSend () {
        this.btnSend.click();
    }

    clickBackToLogin () {
        this.backToLoginLink.click();
    }
}

module.exports = new ResetPasswordPage();