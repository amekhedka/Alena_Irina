const LoginPage = require('../pageobjects/Login.page');
const { registerActivationLink, createUser, userLogin } = require('../../API/axios.methods');

const faker = require('fake')
const chai = require('chai')
describe('API for Login page', () => {
    let result = null;

    it('API registration', async () => {
        result = await createUser('Ma11111@test.com', 'Manya111@')
        console.log(result)
        expect(!!result.actovationLinkId).toBe(true)
    });

    it('API - user activation', async () => {
        result = await registerActivationLink(result.actovationLinkId)
        console.log(result)
        expect(result.activationString).toHaveText("Activation Successful!")
    });

    it('API - Login', async () => {
        result = await userLogin("Ma4546n45565678ya111@test.com", 'Manya111@')
        console.log(result)
        expect(!!result.accessToken).toBe(true)
    });
});