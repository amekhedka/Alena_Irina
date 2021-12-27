// var axios = require('axios');
// const API_URL = "https://enduring-server.herokuapp.com/v3/graphql"
//
// //  //TODO: REGISTER
// async function createUser(email, password) {
//     const reqData = JSON.stringify({
//         query: `mutation userCreate ($email: String!, $password: String!) {
//     userCreate (email: $email, password: $password)
// }`,
//         //variables: {"email": "K4567@yahoo.com", "password": "Mama123**"}
//         variables: {"email": email, "password": password}
//     });
//     const { data } = await axios({
//         method: 'post',
//         url: API_URL,
//         data: reqData,
//         headers: {
//             //'Authorization' : `Bearer $(token)`,
//             'Content-Type': 'application/json'
//         }
//     });
// //     //console.log(data)
// //
//     if (data.errors) {
//         return {errors: data.errors}
//     } else {
//         const actovationLinkId = data.data.userCreate;
//         return { actovationLinkId };
//     }
// }
// //
// // //createUser();
// //
// //
// // //TODO:User_Activate
// async function registerActivationLink(activationLinkId) {
//     const dataUserActivate = JSON.stringify({
//         query: `mutation userActivate ($activationLinkId: String!) {
//     userActivate (activationLinkId: $activationLinkId)
// }`,
//         variables: {activationLinkId}
//     });
//     const {data} = await axios({
//         method: 'post',
//         url: API_URL,
//         data: dataUserActivate,
//         headers: {
//             //'Authorization' : `Bearer $(token)`,
//             'Content-Type': 'application/json'
//         }
//     });
// //    // console.log(data)
//     if (data.errors) {
//         return {errors: data.errors}
//     } else {
//         const activationString = data.data.userActivate;
//         return {activationString};
//     }
// }
// //
// // //registerActivationLink();


//Todo: User login
async function userLogin(email, password){
    const  reqLoginData = JSON.stringify({
        query: `query login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
        accessToken
        user {
            _id
        }
    }
}`,
        //variables: {"email":"Ma4546n45565678ya111@test.com","password":"Manya111@"}
       variables: {"email":email,"password":password}
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: reqLoginData,
        headers: {
            //'Authorization' : `Bearer $(token)`,
            'Content-Type': 'application/json'
        }
    });
   //console.log(data.data.login.accessToken)
    if (data.errors) {
        return {errors: data.errors}
    } else {
        const accessToken = data.data.login.accessToken;
        return { accessToken };
    }
}

//userLogin()

//Todo: Create company
async function createCompany(       //передаем параметр в виде объекта, то что у нас в variables in Postman + accesToken
    {
        title = 'Maine',
        description = 'Hello everyone!',
        image = 'https://en.wikipedia.org/wiki/Decibel',
        link = 'https://en.wikipedia.org/wiki/Decibel',
        accessToken
    }
    ) {
    const getCompanyID = JSON.stringify({
        query: `mutation companyCreate ($data: CompanyInput) {
        companyCreate (data: $data)
}`,
    variables: {
        data:
            {
                title,
                description,
                image,
                link
            }
    }
});
    const { data } = await axios({
        method: 'post',
        url: API_URL,
        data: getCompanyID,
        headers: {
            'Authorization' : `Bearer ${ accessToken }`,
            'Content-Type': 'application/json'
        }
    });
console.log(data.data.companyCreate)

}
createCompany();


module.exports = {
    // createUser,
    // registerActivationLink,
    userLogin,
    createCompany
}

