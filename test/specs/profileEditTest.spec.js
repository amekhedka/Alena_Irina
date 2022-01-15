const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const ProfileEditPage = require("../pageobjects/ProfileEdit.page");
const LoginData = require('../data/login.data');
const { getElements, clearInput } = require("../../helpers/methods");
//const chaiExpect = require("chai")
const langFromDropdown = "//ul[@id='languages-listbox']/li";
const selectedLangs = "//span[@class='MuiChip-label MuiChip-labelSmall css-1pjtbja']";

describe("Profile", async () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginCredentials(LoginData.userCredentials.email, LoginData.userCredentials.password);
        await LoginPage.btnLogIn.click();
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
        await ProfilePage.editBtn.click();
        const aboutLabel = await ProfileEditPage.labelAbout.getText();
        await expect(aboutLabel).toEqual("About");
    });

    it("Should be able to clean the form", async () => {
        await ProfileEditPage.cleanForm();
        await ProfileEditPage.expectClearForm();

    });

    it("Should be able to count languages in the dropdown", async () => {
        await ProfileEditPage.langDropdownField.click();
        await ProfileEditPage.langDropdownField.click();
        await expect((await getElements(langFromDropdown)).length).toEqual(18);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log((await getElements(langFromDropdown)).length);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        await browser.freeze();
    });

    it("Should be able to retrieve the names of the  languages in the dropdown and check sort", async () => {
        await ProfileEditPage.langDropdownField.click();
        //await browser.waitUntil((await getElements(langFromDropdown)).length === 18);
        const arrOfNames = [];
        for(let i = 1; i <= (await $$("//ul[@id='languages-listbox']/li")).length; i++){
            let langNameForArray = await $(`(//ul[@id='languages-listbox']/li)[${i}]`).getText();
            arrOfNames.push(langNameForArray);
        }
        await expect(arrOfNames === arrOfNames.sort()).toEqual(true);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(arrOfNames.toString());
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(arrOfNames.sort().toString());
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    });

    it("Should be able to count selected languages in the languages field", async () => {
        await ProfileEditPage.selectLanguage();
        await expect(((await getElements(selectedLangs)).length) === 18);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log((await getElements(selectedLangs)).length);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    });

    it("Should compare Languages in Dropdown and Selected Languages", async () => {
        await expect(getElements(langFromDropdown)).toEqual(getElements(selectedLangs));
    });

    it("Should be able to retrieve the names of the selected languages in the lang field and check sort", async () => {
            const arrOfNames = [];
            for(let i = 1; i <= (await $$("//span[@class='MuiChip-label MuiChip-labelSmall css-1pjtbja']")).length; i++){
                let langNameForArray = await $(`(//span[@class='MuiChip-label MuiChip-labelSmall css-1pjtbja'])[${i}]`).getText();
                arrOfNames.push(langNameForArray);
            }
            await expect(arrOfNames === arrOfNames.sort()).toEqual(true);
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(arrOfNames.toString());
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(arrOfNames.sort().toString());
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        });

    it("Should be able to fill the form and save", async () => {
        await ProfileEditPage.fillForm("Mary", "Star", "QA Lead", "https://static7.depositphotos.com/1297553/795/i/600/depositphotos_7951909-stock-photo-team-of-lifting-it-information.jpg", "the best");
        await ProfileEditPage.btnSave.click();
        const titleText = await ProfilePage.title.getText();
        await expect(titleText).toEqual("user");
    });

    it("Should be able to delete image and save", async () => {
        await ProfilePage.editBtn.click();
        await clearInput(ProfileEditPage.inputImageLink);
        await ProfileEditPage.btnSave.click();
        await expect (ProfilePage.profileImageInitials).toHaveValue()
    });


    // it("Should match all changes after save on Profile Page", async () => {
    //
    //     expect(titleText).toEqual("user");
    // });
});
