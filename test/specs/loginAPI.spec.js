const LoginPage = require('../pageobjects/Login.page');
const { createUser, req_Link } = require("../../helpers/axios.methods")

describe('API for Login page', () => {
    let result = null;

    it('API registration', async () => {
        result = await createUser('Manya111@test.com', 'Manya111@')
        console.log(result)
        expect(!!result.Activatiom)
    });
});