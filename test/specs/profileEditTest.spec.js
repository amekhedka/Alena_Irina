const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const ProfileEditPage = require("../pageobjects/ProfileEdit.page");
const LoginData = require('../data/login.data');
const langFromDropdown = "//ul[@id='languages-listbox']/li";
const selectedLangs = "//span[@class='MuiChip-label MuiChip-labelSmall css-1pjtbja']";

describe("Profile", () => {

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

    // it("Count and compare Languages in Dropdown and Selected Languages", async () => {
    //     await ProfileEditPage.langDropdownField.click();
    //     await ProfileEditPage.cleanLang.click();
    //     const res1 = await browser.findElements("xpath", langFromDropdown);
    //     const numOfRes1 = res1.length;
    //     await ProfileEditPage.selectLanguage();
    //     const res2 = await browser.findElements("xpath", selectedLangs);
    //     const numOfRes2 = res2.length;
    //     console.log("+++++++++++++++++++++++++++++++++++");
    //     console.log(numOfRes1)
    //     console.log("+++++++++++++++++++++++++++++++++++");
    //     console.log(numOfRes2)
    //     console.log("+++++++++++++++++++++++++++++++++++");
    //     await expect(numOfRes1 === numOfRes2).toEqual(true);
    // });

    it("Should be able to clean the form", async () => {
        await ProfileEditPage.cleanForm();
        await ProfileEditPage.expectClearForm();
    });

    it("Should be able to count languages in the dropdown", async () => {
        const res1 = await browser.findElements("xpath", langFromDropdown);
        const numOfRes1 = res1.length;
        console.log("+++++++++++++++++++++++++++++++++++");
        console.log(numOfRes1)
        console.log("+++++++++++++++++++++++++++++++++++");
        await expect(numOfRes1).toEqual(18);
    });

    it("Should be able to count selected languages in the languages field", async () => {
        await ProfileEditPage.selectLanguage();
        const res2 = await browser.findElements("xpath", selectedLangs);
        const numOfRes2 = res2.length;
        console.log("+++++++++++++++++++++++++++++++++++");
        console.log(numOfRes2)
        console.log("+++++++++++++++++++++++++++++++++++");
        await expect(numOfRes2).toEqual(18);
    });

    it("Should ompare Languages in Dropdown and Selected Languages", async () => {
        await expect(numOfRes1 === numOfRes2).toEqual(true);
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
