const Page = require('./Page');

class ProfileEditPage extends Page {

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

    async fillForm (firstName, lastName, jobTitle, imageLink, about) {
        await this.open()
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputJobTitle.setValue(jobTitle);
        await this.inputImageLink.setValue(imageLink);
        await this.inputAbout.setValue(about);
    }

    open() {
        return super.open('/edit');
    }
}
module.exports = new ProfileEditPage();