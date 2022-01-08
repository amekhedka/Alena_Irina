const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const ProfileEditPage = require("../pageobjects/ProfileEdit.page");
const LoginData = require('../data/login.data');
const { countElements } = require("../../helpers/methods");
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
        expect(aboutLabel).toEqual("About");
    });

    it("Should be able to clean the form", async () => {
        await ProfileEditPage.cleanForm();
        await ProfileEditPage.expectClearForm();
    });

    it("Should be able to count languages in the dropdown", async () => {
        await countElements(langFromDropdown);
        await expect(await countElements(langFromDropdown) === 18);
        console.log(await countElements(langFromDropdown));
    });

    it("Should be able to count selected languages in the languages field", async () => {
        await ProfileEditPage.selectLanguage();
        await countElements(selectedLangs);
        await expect(await countElements(selectedLangs) === 18);
        console.log(await countElements(selectedLangs));
    });

    it("Should compare Languages in Dropdown and Selected Languages", async () => {
        await expect(countElements(langFromDropdown)).toEqual(countElements(selectedLangs));
    });

    it("Should be able to fill the form", async () => {
        await ProfileEditPage.fillForm("Mary", "Star", "QA Lead", "https://static7.depositphotos.com/1297553/795/i/600/depositphotos_7951909-stock-photo-team-of-lifting-it-information.jpg", "the best");
        // await
    });

    it("Should be able to fill the form and save", async () => {
        await ProfileEditPage.btnSave.click();
        await browser.pause(2000);
        const titleText = await ProfilePage.title.getText();
        expect(titleText).toEqual("user");
    });
});
