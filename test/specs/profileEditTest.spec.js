//const chai = require("chai");
const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const { getInitials, clearInput } = require("../../helpers/methods");
const ProfileEditPage = require("../pageobjects/ProfileEdit.page");
const LoginData = require('../data/login.data');

describe("Profile", () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginCredentials(LoginData.userCredentials.email, LoginData.userCredentials.password);
        await LoginPage.btnLogIn.click();
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
        await ProfilePage.editBtn.click();
    })

    it("Should be able to fill the form and save", async () => {
        await clearInput(ProfileEditPage.inputFirstName);
        await clearInput(ProfileEditPage.inputLastName);
        await clearInput(ProfileEditPage.inputJobTitle);
        await ProfileEditPage.fillForm("Mary", "Star", "QA Lead", "https://static7.depositphotos.com/1297553/795/i/600/depositphotos_7951909-stock-photo-team-of-lifting-it-information.jpg", "the best");
        await ProfileEditPage.langDropdownBox.selectByVisibleText("Java");
        await ProfileEditPage.btnSave.click();
    });

    // it("Should be able to clean the form", async () => {
    //         await ProfilePage.editBtn.click();
    //         await clearInput(ProfileEditPage.inputFirstName);
    //         const emptyFirstName = await ProfileEditPage.inputFirstName.getValue();
    //         await clearInput(ProfileEditPage.inputLastName);
    //         await clearInput(ProfileEditPage.inputJobTitle);
    //         // const expect = chai.expect;
    //         // await expect (emptyFirstName).to.be.empty;
    // });
});
