const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const GlobalNavigationPage = require('../pageobjects/GlobalNavigation.page');
const { clearInput, areEmptyFields } = require('../../helpers/methods');
const errorMessage = "Please fill out this field";
const pw_errorMessage = "Incorrect password";
const chai = require("chai");
const assert = chai.assert;
//const {createCompany} = require("../../helpers/axios.methods");


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
        await LoginPage.inputEmail.setValue("Manya111@test.com");
        await LoginPage.btnLogIn.click();
        const getTitle = await PublicationsPage.publicationsTitle.getText()
        await expect(getTitle).toEqual('publications');
    });


    it('shouldn`t login with empty fields', async () => {
            await GlobalNavigationPage.btnMenu.click();
            await GlobalNavigationPage.logOutOption.click();
            await LoginPage.fillLoginCredentials('', '');
            await LoginPage.btnLogIn.click();
            //need assertion
        });

    it('shouldn`t login with empty Email', async () => {
            await LoginPage.fillLoginCredentials('', 'Manya111@');
            await LoginPage.btnLogIn.click();
            //need assertion
        });


    it('shouldn`t login with empty PW', async () => {
            await browser.refresh();
            await LoginPage.fillLoginCredentials('Manya111@test.com', '');
            await LoginPage.btnLogIn.click();
          //need assertion
    });

    it.only('Login after refresh browser page', async () => {
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await browser.refresh();
        console.log( await LoginPage.inputEmail.getText())
        // //expect( await LoginPage.inputEmail.getText()).toEqual("4567890")
        // const emailText =   await LoginPage.inputEmail.getText()
        // expect(emailText.length).toEqual(0)
    });
});