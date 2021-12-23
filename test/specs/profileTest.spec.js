const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const MenuPage = require("../pageobjects/Menu.page");

describe("Profile", () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.clickLoginBtn();
    })

    it('Should redirect on Profile Page', async () => {
        await MenuPage.clickMenu();
        await MenuPage.clickProfile();
        await expect(ProfilePage.title).toHaveText("user");
        expect(ProfilePage.title).toBeExisting().true;
    });
});
