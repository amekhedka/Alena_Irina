const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const { getInitials, clearInput} = require("../../helpers/methods");
const ProfileEditPage = require("../pageobjects/ProfileEdit.page");

describe("Profile", () => {

    before(async () => {
        await browser.maximizeWindow();
    })

    it('Should redirect on Profile Page', async () => {
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.btnLogIn.click();
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
        const titleText = await ProfilePage.title.getText();
        await expect(titleText).toEqual("user");
    });

    it("ImageLetter should match FullName", async () => {
        const fullName = ProfilePage.profileName.getText();
        const nameInit = getInitials(fullName);
        const imageInit = ProfilePage.profileImageInitials.getText();
        await expect(nameInit).toEqual(imageInit);
    })

    it("Should be able to clean the form", async () => {await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await ProfilePage.editBtn.click();
        await clearInput(ProfileEditPage.inputFirstName);
        await clearInput(ProfileEditPage.inputLastName);
        await clearInput(ProfileEditPage.inputJobTitle);
        
    });

    it("Should be able to fill the form and save")
});
