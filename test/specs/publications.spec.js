let title = `New post${Date.now()}`;
let imageLink = "https://halloweenwholesalers.com/pub/media/catalog/product/cache/9d08971813a040f8f96067a40f75c615/f/c/fc01032359.png";
let description = "QA";
let content = "I like JS";
let anyText = "Hello world";
let publicationTitle = "publications";
let placeholderTitle = "Title *";
let placeholderImage = "Image link";
let placeholderDescription = "Description *";
let placeholderContent = "Content *";
let comment = "Hello world"
let validationError = "ValidationError: title: Max length is 255 characters, description: Max length is 255 characters";
const LoginPage = require('../pageobjects/Login.page');
const PublicationsPage = require('../pageobjects/Publications.page');
const LoginData = require('../data/login.data');
const PublicationCreationPage = require("../pageobjects/PublicationCreation.page");
const NovBar = require("../pageobjects/GlobalNavigation.page");

describe('Publications page', () => {
    let characters = Array.from(Array(89).keys()).toString();

    before(async () => {
        await browser.maximizeWindow();
        await LoginPage.login(LoginData.userCredentials.email, LoginData.userCredentials.password);
    });

    it("Publications title should exist and has publications text", async () => {
        await expect(PublicationsPage.publicationsTitle).toBeExisting();
        await expect(PublicationsPage.publicationsTitle).toHaveTextContaining(publicationTitle);
    });

    it('Verify posts are created', async () => {
        for (let i = 1; i <= 3; i++) {
            await PublicationsPage.btnAddPost.click();
            await PublicationCreationPage.fillPost(title + `${i}`, imageLink, description, content);
            let tempTitle = await PublicationsPage.publicationsList.getText();
            await expect(tempTitle).toEqual(title + `${i}`);
        }
    });

    it("should publicationsTitle be exist and has text publications ", async () => {
        await PublicationsPage.btnAddPost.click();
        await PublicationCreationPage.inputPostTittle.setValue(characters);
        await PublicationCreationPage.inputDescription.setValue(characters);
        await PublicationCreationPage.inputContent.setValue(anyText);
        await PublicationCreationPage.btnSavePost.click();
        await expect(PublicationCreationPage.warningLimitCharacters).toHaveText(validationError);
    });

    it("Verify placeholders on the creation page", async () => {
        await browser.refresh();
        await expect(PublicationCreationPage.titlePlaceholder).toHaveTextContaining(placeholderTitle);
        await expect(PublicationCreationPage.imagePlaceholder).toHaveTextContaining(placeholderImage);
        await expect(PublicationCreationPage.DescriptionPlaceholder).toHaveTextContaining(placeholderDescription);
        await expect(PublicationCreationPage.ContentPlaceholder).toHaveTextContaining(placeholderContent);
    });

    it("After clicking on the arrow back, the user returned on the publication page", async () => {
        await PublicationCreationPage.arrowBack.click();
        await expect(PublicationsPage.publicationsTitle).toHaveTextContaining(publicationTitle);
    });

    it("Verify comment is created ", async () => {
        await PublicationsPage.publicationsList.click();
        await PublicationsPage.btnComment.click();
        await PublicationsPage.inputComment.setValue(anyText);
        await PublicationsPage.sendComment.click();
        let temp = await PublicationsPage.comments.getText();
        await expect(temp).toEqual(anyText);
    });

    it.only("Verify 3 comments is created ", async () => {
        await PublicationsPage.publicationsList.click();
        await PublicationsPage.btnComment.click();
        await PublicationsPage.createComments(comment);
    });

    it ("Verify the like is created", async () => {
        let beforeLike = await PublicationsPage.mlCountLike.getText();
        await PublicationsPage.btnLike.click();
        await browser.pause(2000);
        let afterLike = await PublicationsPage.mlCountLike.getText();
        await expect(beforeLike !== afterLike).toEqual(true);
    });
});




