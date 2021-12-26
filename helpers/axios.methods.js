var axios = require('axios');
const API_URL = "https://enduring-server.herokuapp.com/v3/graphql"

 //TODO: REGISTER
async function createUser(email, password) {
    const reqData = JSON.stringify({
        query: `mutation userCreate ($email: String!, $password: String!) {
    userCreate (email: $email, password: $password)
}`,
        //variables: {"email": "K4567@yahoo.com", "password": "Mama123**"}
        variables: {"email": email, "password": password}
    });
    const { data } = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            //'Authorization' : `Bearer $(token)`,
            'Content-Type': 'application/json'
        }
    });
    //console.log(data)

    if (data.errors) {
        return {errors: data.errors}
    } else {
        const actovationLinkId = data.data.userCreate;
        return { actovationLinkId };
    }
}

//createUser();


//TODO:User_Activate
async function registerActivationLink(activationLinkId) {
    const dataUserActivate = JSON.stringify({
        query: `mutation userActivate ($activationLinkId: String!) {
    userActivate (activationLinkId: $activationLinkId)
}`,
        variables: {activationLinkId}
    });
    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: dataUserActivate,
        headers: {
            //'Authorization' : `Bearer $(token)`,
            'Content-Type': 'application/json'
        }
    });
   // console.log(data)
    if (data.errors) {
        return {errors: data.errors}
    } else {
        const activationString = data.data.userActivate;
        return {activationString};
    }
}

//registerActivationLink();

module.exports = {
    createUser,
    registerActivationLink
}