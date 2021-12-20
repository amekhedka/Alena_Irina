const LoginPage = require('../pageobjects/Login.page');
const SecurePage = require('../pageobjects/Secure.page');

describe('My Login application', () => {
    it('should fillLoginData with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.fillLoginData('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
});


