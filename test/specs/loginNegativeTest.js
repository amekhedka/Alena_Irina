const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const GlobalNavigationPage = require('../pageobjects/GlobalNavigation.page');
const { clearInput } = require('../../helpers/methods');
const errorMessage = "Please fill out this field";
const pw_errorMessage = "Incorrect password";

describe('Login functionality', () => {

    before(() => {
        browser.maximizeWindow();
    });

    it('Should not login with invalid email', async () => {
        await LoginPage.open();
        await LoginPage.inputEmail.setValue('12345678909876543');
        await LoginPage.inputPassword.setValue('Manya111@');
        await LoginPage.btnLogIn.click();
        const res = await LoginPage.errorMessage.getText();
        await expect(res).toEqual("User with provided email does not exist");
    });

    it('Enter valid email', async () => {
        await clearInput(await LoginPage.inputEmail)
        await LoginPage.inputEmail.setValue('Manya111@test.com');
        await LoginPage.btnLogIn.click();
        await expect(PublicationsPage.publicationsTitle).toEqual('publications');
    });

    // //Todo: finished
    // it('shouldn`t login with empty fields', async () => {
    //         await LoginPage.fillLoginCredentials('bbbbbbbbbb', 'vvvvvvvvvv');
    //         await isObjectEmpty(LoginPage.inputEmail);
    //         await isObjectEmpty(LoginPage.inputPassword);
    //         await LoginPage.btnLogIn.click();
    //         //
    //     });

    //Todo: finished
    it('shouldn`t login with empty Email', async () => {
            await LoginPage.fillLoginCredentials('', 'Manya111@');
            await LoginPage.btnLogIn.click();;
        });
    //
    // Todo: finished
    // it('shouldn`t login with empty PW', async () => {
    //         await LoginPage.fillLoginCredentials('Manya111@test.com', '');
    //         await LoginPage.btnLogIn.click();
    //     });
    //
    // Todo: finished
    // it('Login after refresh browser page', async () => {
    //         await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
    //         await browser.refresh();
    //         await LoginPage.btnLogIn.click();;
    //     });

});