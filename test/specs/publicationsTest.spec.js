const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');


describe('My Post', () => {

    before(async () => {
        await browser.maximizeWindow();
    })
    it('Add post', async () => {
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.btnLogIn.click();
        await PublicationsPage.btnAddPost.click();
        await PublicationsPage.fillPost('Automation_Test',"https://media.istockphoto.com/photos/portland-maine-usa-downtown-skyline-picture-id1139100726", "hi", 'test');
        await PublicationsPage.btnSavePost.click()

     });

    // it("The placeholder Title contains the correct text", async () => {
    //     await PublicationsPage.btnAddPost.click();
    //     expect(PublicationsPage.titlePlaceholder).toHaveTitle("Title");
    // });
});
