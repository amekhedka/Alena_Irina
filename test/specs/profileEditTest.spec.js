const LoginPage = require('../pageobjects/Login.page');
const ProfileEditPage = require('../pageobjects/ProfileEdit.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const {getInitials, clearInput} = require("../../helpers/methods");

describe("ProfileEdit - Fill the form", () => {

    before(async () => {
        await browser.maximizeWindow();
    })

    it("Should be able to clean the form", async () => {await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.btnLogIn.click();
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
        await ProfilePage.editBtn.click();
        await clearInput(ProfileEditPage.inputFirstName);
        await clearInput(ProfileEditPage.inputLastName);
        await clearInput(ProfileEditPage.inputJobTitle);
        //
    });

    it("Should be able to fill the form and save")
});