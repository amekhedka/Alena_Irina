const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublivationsCreationPage = require('../pageobjects/PublicationCreation.page')


describe('My Post', () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.btnLogIn.click();
    })
    it.only('Add post', async () => {
        for (let i = 1; i <= 3; i++) {
            await PublicationsPage.btnAddPost.click();
            await PublivationsCreationPage.inputPostTittle.setValue(`Maine!!!! ${i}`);
            await PublivationsCreationPage.inputDescription.setValue(`New Position ${i}`);
            await PublivationsCreationPage.inputContent.setValue(`Minimum qualifications ${i}`);
            await PublivationsCreationPage.btnSavePost.click();
            let tempTitle = await $("div.pb-4>div:nth-child(2)>div>a>div");
            let tempTitle1 = await tempTitle.getText();
            await expect(tempTitle1).toEqual(`Maine!!!! ${i}`);
        }

    });
});
