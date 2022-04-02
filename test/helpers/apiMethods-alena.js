const { getActivationLinkByCreatingUser, registerActivationLink, userLogin } = require("../requestsAPI/api_e2e_requests");

async function createAndLoginAPI(email, password){
    const userCreateRes = await getActivationLinkByCreatingUser(email, password);
    if(userCreateRes.errors) console.log(userCreateRes.errors);

    const registerActivationLinkRes = await registerActivationLink(userCreateRes.activationLinkId);
    if(registerActivationLinkRes.errors) console.log(registerActivationLinkRes.errors);

    const userLoginRes = await userLogin(email, password);
    if(userLoginRes.errors) console.log(userLoginRes.errors);

    return userLoginRes.Token
}

module.exports = {
    createAndLoginAPI
}