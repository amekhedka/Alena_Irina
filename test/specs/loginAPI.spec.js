const LoginPage = require('../pageobjects/Login.page');
const { registerActivationLink } = require('../../helpers/axios.methods');
const { createUser } = require('../../helpers/axios.methods');
const faker = require('fake')
const chai = require('chai')
describe('API for Login page', () => {
    let result = null;   //создали переиенную пока с значением NULL

    it('API registration', async () => {
        result = await createUser('Ma4546n45565678ya111@test.com', 'Manya111@')
        console.log(result)
        expect(!!result.actovationLinkId).toBe(true)
    });

    it('API - user activation', async () => {
        result = await registerActivationLink(result.actovationLinkId)
        console.log(result)
        expect(result.activationString).toHaveText("Activation Successful!")
    });
});