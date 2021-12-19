const Page = require('./Page');
const arrLang = [];

class ProfilePage extends Page {

    get menu () {
        return $('#nav-bar-toggle');
    }

    get edit () {
        return $('div.MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel');
    }

    get profileImageInitials () {
        return $('div.profile-image initials');
    }

    get profileData () {
        return $('div.ant-col p-3');
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

    async fillForm (firstName, lastName, jobTitle, imageLink, about, arrLang) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputJobTitle.setValue(jobTitle);
        await this.inputImageLink.setValue(imageLink);
        await this.inputAbout.setValue(about);
        await this.inputLanguages.setValue(arrLang);
        await this.btnSave.click();
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