const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const PublivationsCreationPage = require('../pageobjects/PublicationCreation.page')
const {getElements} = require("../../helpers/methods");
const anyPublication = "//div[@class='text-break']";
let tempTitle = await $("div.pb-4>div:nth-child(2)>div>a>div");

describe('My Post', () => {

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.fillLoginCredentials('Manya111@test.com', 'Manya111@');
        await LoginPage.btnLogIn.click();
    });

    it('Add post', async () => {
        for (let i = 1; i <= 3; i++) {
            await PublicationsPage.btnAddPost.click();
            await PublivationsCreationPage.inputPostTittle.setValue(`Test!!!! ${i}`);
            await PublivationsCreationPage.inputDescription.setValue(`New Test${i}`);
            await PublivationsCreationPage.inputContent.setValue(`Minimum qualifications ${i}`);
            await PublivationsCreationPage.btnSavePost.click();
            let tempTitle1 = await tempTitle.getText();
            await expect(tempTitle1).toEqual(`Maine!!!! ${i}`);
        }
        });

        it('Verify the Publications List is paginated by 10', async () => {
            await expect(await getElements(anyPublication).length).toEqual(18);
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            console.log(getElements(anyPublication).length);
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            //await expect(PublicationsPage.anyPubTitle).toBeElementsArrayOfSize(10);
        });
});
