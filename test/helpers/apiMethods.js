const axios = require('axios');
const {attachConsoleLogs} = require("@wdio/allure-reporter/build/utils");
const LoginData = require("../data/login.data");
const API_URL = "https://enduring-server.herokuapp.com/v3/graphql";
const fakeEmail = LoginData.fakeCredentialsUser2.email;
const fakePassword = LoginData.fakeCredentialsUser2.password;

async function getActivationLinkByCreatingUser(email, password) {
    const reqData = JSON.stringify({
        query: `mutation userCreate ($email: String!, $password: String!) {
    userCreate (email: $email, password: $password)
}`,
        variables: {"email": email, "password": password}
    });

    const { data } = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            // This is an example how to use bearer token if it needs to be used. Don't delete it!
            // 'Authorization' : `Bearer $(token)`,
            'Content-Type': 'application/json'
        }
    });

    if (data.errors) {
        return {errors: data.errors}
    } else {
        const activationLinkId = data.data.userCreate;
        return activationLinkId;
        // return myData;
    }
}

async function getActivationDataByCreatingUser(email, password) {
    const reqData = JSON.stringify({
        query: `mutation userCreate ($email: String!, $password: String!) {
    userCreate (email: $email, password: $password)
}`,
        variables: {"email": email, "password": password}
    });

    const userData = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (userData.data.errors) {
        return {errors: userData.data.errors}
    } else {
        return userData;
    }
}

async function registerActivationLink(activationLinkId) {
    const dataToActivateUser = JSON.stringify({
        query: `mutation userActivate ($activationLinkId: String!) {
    userActivate (activationLinkId: $activationLinkId)
}`,
        variables: { activationLinkId }
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: dataToActivateUser,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.userActivate;
    }
}

async function loginUserViaAPI(email, password) {
    const dataToLoginUser = JSON.stringify({
        query: `query login ($email: String!, $password: String!) {
                  login (email: $email, password: $password) {
                    accessToken
                    user {
                      _id
                    }
                  }
        }`,
        variables: {"email":email,"password":password}
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: dataToLoginUser,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (data.errors) {
        return {errors: data.errors}
    } else {
        const accessTok= data.data.login.accessToken;
        const _userId = data.data.login.user._id;
        return {
            accessTok,
            _userId
        };
    }
}

async function deleteUserFromDataBase (userId, accessToken){
    const userDataToDelete = JSON.stringify({
        query: `mutation userDelete ($userId: ID!) {
    userDelete(userId: $userId)}`,

        variables: { userId: userId }
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: userDataToDelete,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
    });
    // console.log(data.data.userDelete);

    if (data.errors) {
        return {errors: data.errors}
    } else {
        return data.data.userDelete;
    }
}

async function returnListOfProblemObjects(accessToken,limitOfObject){
    const dataForQuery = JSON.stringify({
        query: `query problems ($offset: Int, $limit: Int) {
    problems (offset: $offset, limit: $limit) {
        _id
        title
        owner {
            _id
        }
    }
}`,
        variables: {"offset":0,"limit":limitOfObject}
    });

    const data = await axios({
        method: 'post',
        url: API_URL,
        data: dataForQuery,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
    });

    if (data.data.errors) {
        return data.data.errors;
    } else {
        return data.data.data.problems;
    }
}

async function deleteProblem(problemId, accessToken) {
    const reqData = JSON.stringify({
        query: `mutation problemDelete ($problemId: ID!) {
    problemDelete (problemId: $problemId)
}`,
        variables: {"problemId": problemId}
    });

    const config = await axios({
        method: 'post',
        url: API_URL,
        data : reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    if(config.data.errors){
        return config.data.errors
    } else return config.data.data.problemDelete;
    }


// Todo: check if userLogin works
// async function userLogin(email, password){
//     const  reqLoginData = JSON.stringify({
//         query: `query login ($email: String!, $password: String!) {
//     login (email: $email, password: $password) {
//         accessToken
//         user {
//             _id
//         }
//     }
// }`,
//         //variables: {"email":"Ma4546n45565678ya111@test.com","password":"Manya111@"}
//         variables: {"email":email,"password":password}
//     });
//
//     const {data} = await axios({
//         method: 'post',
//         url: API_URL,
//         data: reqLoginData,
//         headers: {
//             //'Authorization' : `Bearer $(token)`,
//             'Content-Type': 'application/json'
//         }
//     });
//     //console.log(data.data.login.accessToken)
//     if (data.errors) {
//         return {errors: data.errors}
//     } else {
//         const accessToken = data.data.login.accessToken;
//         return { accessToken };
//     }
// }

// Todo: finish function createCompany
// async function createCompany(
//     {
//         title = 'Maine',
//         description = 'Hello everyone!',
//         image = 'https://en.wikipedia.org/wiki/Decibel',
//         link = 'https://en.wikipedia.org/wiki/Decibel',
//         accessToken
//     }
// ) {
//     const getCompanyID = JSON.stringify({
//         query: `mutation companyCreate ($data: CompanyInput) {
//         companyCreate (data: $data)
// }`,
//         variables: {
//             data:
//                 {
//                     title,
//                     description,
//                     image,
//                     link
//                 }
//         }
//     });
//     const { data } = await axios({
//         method: 'post',
//         url: API_URL,
//         data: getCompanyID,
//         headers: {
//             'Authorization' : `Bearer ${ accessToken }`,
//             'Content-Type': 'application/json'
//         }
//     });
//     console.log(data.data.companyCreate)
//
// }
// createCompany();

// Todo: check if need this function createANDLoginAPI and if it works
// async function createANDLoginAPI(email, password){
//     const userCreateRes = createUser(email, password);
//     if(userCreateRes.errors) console.log(userCreateRes.errors);
//
//     const userActiveLink = registerActivationLink(activationLinkId);
//     if(userActiveLink.errors) console.log(userActiveLink.errors);
//
//     const userLoginRes = userLogin(email, password);
//     if(userLoginRes.errors) console.log(userLoginRes.errors);
//
//     return  userLoginRes.accessToken;
// }

module.exports = {
    getActivationLinkByCreatingUser,
    registerActivationLink,
    getActivationDataByCreatingUser,
    loginUserViaAPI,
    deleteUserFromDataBase,
    returnListOfProblemObjects,
    deleteProblem
    // userLogin,
    // createCompany
}