const Page = require('./Page');
const {clearInput, countElements} = require("../../helpers/methods");

class ProfileEditPage extends Page {

    get inputFirstName() {
        return $('#first-name');
    }

    get inputLastName() {
        return $('#last-name');
    }

    get inputJobTitle() {
        return $('#job-title');
    }

    get inputImageLink() {
        return $('#image');
    }

    get inputAbout() {
        return $('#about');
    }

    get labelAbout() {
        return $('#about-label');
    }

    get inputLanguages() {
        return $('#languages');
    }

    get langDropdownBtn() {
        return $("//button[@aria-label='Open']");
    }

    get langDropdownField() {
        return $("#languages");
    }

    get langListBox() {
        return $("//ul[@id='languages-listbox']")
    }

    get langOption() {
        return $("//li[@id='languages-option-0']");
    }

    get cleanLang() {
        return $("(//button[@title='Clear'])[1]")
    }

    get btnSave() {
        return $('button[type="submit"]');
    }

    get btnCancel() {
        return $('button[type="type"]');
    }

    async cleanForm() {
        await clearInput(this.inputFirstName);
        await clearInput(this.inputLastName);
        await clearInput(this.inputJobTitle);
        await clearInput(this.inputImageLink);
        await clearInput(this.inputAbout);
        await this.langDropdownField.click();
        await this.cleanLang.click();
    }

    async expectClearForm() {
        const firstNameField = await this.inputFirstName.getValue();
        expect(firstNameField.length).toEqual(0);
        const lastNameField = await this.inputLastName.getValue();
        expect(lastNameField.length).toEqual(0);
        const jobTitleField = await this.inputJobTitle.getValue();
        expect(jobTitleField.length).toEqual(0);
        const imageLinkField = await this.inputImageLink.getValue();
        expect(imageLinkField.length).toEqual(0);
        const aboutField = await this.inputAbout.getValue();
        expect(aboutField.length).toEqual(0);
        const langField = await this.langDropdownField.getValue();
        expect(langField.length).toEqual(0);
    }

    async fillForm(firstName, lastName, jobTitle, imageLink, about) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputJobTitle.setValue(jobTitle);
        await this.inputImageLink.setValue(imageLink);
        await this.inputAbout.setValue(about);
    }

    async selectLanguage() {
        do {                                                           // if we don`t know the quantity of languages
            await this.langOption.click();
            await this.langDropdownField.click();
        }
        while (await this.langOption.isClickable());
        await this.langDropdownField.click();

        // for (let i = 0; i <= 17; i++) {                             // if we know the quantity of languages
        //     await this.langDropdownField.click();
        //     await this.langOption.click();
        // }
    }

    open() {
        return super.open('/edit');
    }
}

module.exports = new ProfileEditPage();