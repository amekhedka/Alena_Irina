const PublicationsPage = require('../pageobjects/Publications.page');

describe('Title', () => {

    it('Title', async () => {
        await PublicationsPage.clickbtnAddPost();
        await expect(PublicationsPage.element).toBeExisting().true;
    });
});
