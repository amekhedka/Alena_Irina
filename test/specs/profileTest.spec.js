const LoginPage = require('../pageobjects/Login.page');
const ProfilePage = require('../pageobjects/Profile.page');
const MenuPage = require("../pageobjects/Menu.page");

describe('My Login application', () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginData('Manya111@test.com', 'Manya111@');
        await LoginPage.clickLoginBtn();
    })

    it('Should redirect on Publication Page', async () => {
        await MenuPage.clickMenu();
        await MenuPage.clickProfile();
        await expect(ProfilePage.title).toHaveText("user");
        await expect(ProfilePage.title).toBeExisting().true;
    });
});