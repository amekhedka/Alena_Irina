const Page = require('./Page');

class ProfilePage extends Page {

    get menu () {
        return $('#nav-bar-toggle');
    }

    get btnBack() {
        return $(".btn.btn-link")
    }

    get edit () {
        return $("div[class='ant-row justify-content-between mb-3'] button[type='button']");
    }

    get profileImageInitials () {
        return $("//div[@class='profile-image initials']");
    }

    get profileData () {
        return $(".ant-col.p-3");
    }

    get inputFirstName () {
        return $('#first-name');
    }

    get inputLastName () {
        return $('#last-name');
    }

    get inputJobTitle () {
        return $('#job-title');
    }

    get inputImageLink () {
        return $('#image');
    }

    get inputAbout () {
        return $('#about');
    }

    get inputLanguages () {
        return $('#languages');
    }
    get btnSave () {
        return $('button[type="submit"]');
    }

    get btnCancel () {
        return $('button[type="type"]');
    }

    async fillForm (firstName, lastName, jobTitle, imageLink, about, lang) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputJobTitle.setValue(jobTitle);
        await this.inputImageLink.setValue(imageLink);
        await this.inputAbout.setValue(about);
        await this.inputLanguages.setValue(lang);
        await this.btnSave.click();
    }

    clickbtnBack () {
        this.btnBack.click();
    }

    clickSave () {
        this.btnSave.click();
    }

    clickCancel () {
        this.btnCancel.click();
    }

    open() {
        return super.open('Profile');
    }
}
module.exports = new ProfilePage();