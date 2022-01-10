const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const { getInitials } = require("../../helpers/methods");
const LoginData = require('../data/login.data');
const PublicationsPage = require('../pageobjects/Publications.page');
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");

describe("Profile", () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginCredentials(LoginData.userCredentials.email, LoginData.userCredentials.password);
        await LoginPage.btnLogIn.click();
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
    })

    it('Should redirect on Profile Page', async () => {
        const titleText = await ProfilePage.title.getText();
        await expect(titleText).toEqual("user");
    });

    it("ImageLetter should match FullName", async () => {
        const fullName = ProfilePage.profileName.getValue();
        const nameInit = getInitials(fullName);
        await browser.pause(500);
        const imageInit = ProfilePage.profileImageInitials.getValue();
        await browser.pause(500);
        await expect(nameInit).toEqual(imageInit);
        console.log("+++++++++++++++++++++++++++++++++++++++++");
        console.log(nameInit);
        console.log(imageInit);
        console.log("+++++++++++++++++++++++++++++++++++++++++");
    });

    // it('Button back should redirect on Publication Page ', async () => {
    //     await ProfilePage.btnBack.click();
    //     await browser.pause(2000);
    //     const addPublication = PublicationsPage.btnAddPost;
    //     console.log("+++++++++++++++++++++++++++++++++++++++++");
    //     console.log(addPublication.getText());
    //     console.log("+++++++++++++++++++++++++++++++++++++++++");
    //     await expect(addPublication).toHaveText('ADD PUBLICATION');
    // });
    //
    // it("Verify the user login under correct email", async () => {
    //     await expect(ProfilePage.checkEmail).toHaveTextContaining("manya111@test.com");
    //
    // });
});