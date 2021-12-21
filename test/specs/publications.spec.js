const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');


describe('My Post', () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginData('Manya111@test.com', 'Manya111@');
        await LoginPage.clickLoginBtn();

    })
    it('Add post', async () => {
        await expect(PublicationsPage.publicationsTitle).toHaveText("publications");
        await PublicationsPage.clickbtnAddPost();
        await PublicationsPage.fillPost('Automation_Test',"https://media.istockphoto.com/photos/portland-maine-usa-downtown-skyline-picture-id1139100726", "hi", 'test');
        await PublicationsPage.clickbtnSavePost()
     });
});
