// const LoginPage = require('../pageobjects/Login.page');
// const PublicationsPage = require("../pageobjects/Publications.page");
// const MenuPage = require('../pageobjects/GlobalNavigation.page');
// const { clearInput } = require('../../helpers/methods');
//
// describe('Login functionality', () => {
//
//         before(() => {
//             browser.maximizeWindow();
//         });
//
//     describe('Login functionality - Positive test', () => {
//
//         it('should login with valid credentials', async () => {
//             await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
//             await LoginPage.clickLoginBtn();
//             await expect(LoginPage.btnLogIn).toBeEnabled().true
//             expect(PublicationsPage.publicationsTitle).toHaveText("publications");
//         });
//     });
//
//     describe('Login functionality - Negative tests', () => {
//
//         it('shouldn`t login with invalid credentials', async () => {
//             await MenuPage.clickMenu();
//             await MenuPage.clickLogOut();
//             await LoginPage.fillLoginCredentials('blabla', '$$$$');
//             await LoginPage.clickLoginBtn();
//             expect(LoginPage.errorMessage).toHaveText("User with provided email does not exist");
//         });
//
//         it('shouldn`t login with empty fields', async () => {
//             await LoginPage.fillLoginCredentials('', '');
//             await LoginPage.clickLoginBtn();
//             expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
//         });
//
//         it('shouldn`t login with empty Email', async () => {
//             await LoginPage.fillLoginCredentials('', 'Manya111@');
//             await LoginPage.clickLoginBtn();
//             expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
//         });
//
//         it('shouldn`t login with empty PW', async () => {
//             await LoginPage.fillLoginCredentials('Manya111@test.com', '');
//             await LoginPage.clickLoginBtn();
//             expect(LoginPage.inputPassword).toString(LoginPage.errorMessage);
//         });
//
//         it('Login after refresh browser page', async () => {
//             await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
//             await browser.refresh();
//             await LoginPage.clickLoginBtn();
//             expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
//         });
//
//         it('Login after clearInput for Email', async () => {
//             await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
//            await LoginPage.inputEmail.clearValue();
//             await LoginPage.clickLoginBtn();
//             expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
//         });
//
//         it('#2 Login after clearInput for Email', async () => {
//             await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
//             await LoginPage.inputEmail.click();
//             await clearInput(LoginPage.inputEmail);
//             await LoginPage.clickLoginBtn();
//             expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
//         });
//     });
//
// it('#3 Login after clearInput for Email', async () => {
//     await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
//     await LoginPage.inputEmail.getText();
//     await LoginPage.inputEmail.Keys.DELETE
//     await LoginPage.clickLoginBtn();
//     expect(LoginPage.inputEmail).toString(LoginPage.errorMessage);
// });
// });
//
//     describe('Login functionality - Verify placeholders', () => {
//
//         it("The placeholder email contains the correct text", () => {
//             expect(LoginPage.emailPlaceholder).toHaveText("Email");
//         });
//
//         it("The placeholder password contains the correct text", () => {
//             expect(LoginPage.emailPlaceholder).toHaveText("Password");
//         });
//     });
// });