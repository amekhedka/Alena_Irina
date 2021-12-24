const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const GlobalNavigation = require("../pageobjects/GlobalNavigation.page");
const { getInitials } = require("../../helpers/methods")

describe("Profile", () => {

    before(async () => {
        await browser.maximizeWindow();
    })

    it('Should redirect on Profile Page', async () => {
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.btnLogIn.click();
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.profileOption.click();
        const res = await ProfilePage.title.getText();
        expect(res).toEqual("user");
    });

    it("ImageLetter should match FullName", async () => {
        const fullName = await ProfilePage.profileName.getText();
        const nameInit  = await getInitials(fullName);
        const imageInit = await ProfilePage.profileImageInitials.getText();
        await expect(nameInit).toEqual(imageInit);
    })
});
