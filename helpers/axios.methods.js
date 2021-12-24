// var axios = require('axios');
// const API_URL = "https://enduring-server.herokuapp.com/v3/graphql"
// // var req_data = JSON.stringify({
// //     query: `mutation userCreate ($email: String!, $password: String!) {
// //     userCreate (email: $email, password: $password)
// // }`,
// //     variables: {"email":"Felic45655ita.Bogan@yahoo.com","password":"WAKwfHd50_PSgQCZ"}
// // });
//
// // var config = {
// //     method: 'post',
// //     url: 'https://enduring-server.herokuapp.com/v3/graphql',
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'Cookie': 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbnlhMTExQHRlc3QuY29tIiwiX2lkIjoiNjFiZTkyNjE1MjU3YWFkMTBkM2FkMGUyIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY0MDE0MTQ4NywiZXhwIjoxNjQwNzQ2Mjg3fQ.-5cXuJ5Tqr5jlP_t0_q5JZNkjkMDLeuABZmTat9XAhQ'
// //     },
// //     data : req_data
// // };
// //
// // axios(config)
// //     .then(function (response) {
// //         console.log(JSON.stringify(response.data));
// //     })
// //     .catch(function (error) {
// //         console.log(error);
// //     });
// //
// // //TODO: Create function
// // async function createUser(){
// //     //Записываем в переменную результат работы запроса
// //      const userCreate = await axios({
// //          method: 'post',
// //          url: 'https://enduring-server.herokuapp.com/v3/graphql',
// //          data: req_data,
// //          headers:{
// //          //'Authorization' : `Bearer $(token)`,
// //              'Content-Type': 'application/json'
// //          }
// //      })
// //     //TODO: debaging
// // //console.log(userCreate)
// //     console.log({
// //        // data:userCreate.data,
// //         errors: userCreate.data.errors
// //     })
// // }
// // createUser();
//
//
// //Todo: add query to the request
// async function createUser(email,password) {
//     var req_data = JSON.stringify({   //
//         query: `mutation userCreate ($email: String!, $password: String!) {
//     userCreate (email: $email, password: $password)
// }`,
//         variables: {"email":"Felic4534655ita.Bogan@yahoo.com","password":"WAKwfHd50_PSgQCZ"}
//         //variables: {"email": email, "password": password}
//     });
//     const { data } = await axios({ ////?????????? диструктуризация
//         method: 'post',
//         url: API_URL,
//         data: req_data,
//         headers: {
//             //'Authorization' : `Bearer $(token)`,
//             'Content-Type': 'application/json'
//         }
//     });
//     console.log(data)
//     console.log(data.errors)
    // console.log(data.errors[0].message)
    // console.log(data.errors[0])


    // //TODO:                   OR
    // console.log({
    //    data: data,
    //    errors: data.errors,
    // })

    //TEST need result. Т.е наша функция что-то делает, и она должна что-то возвращать.
//
//     if(data.errors) {
//         return {errors: data.errors}
//     } else {
//         const activetionLink = data.data.userCreate;
//         return (activetionLink);
//     }
// }

//createUser() //to run the function on the page после того как продебажили и код
// готов можно убирать консоли и вызвание ф-ции. И остается чситый код:

// //TODO: clear code
// var axios = require('axios');
// const API_URL = "https://enduring-server.herokuapp.com/v3/graphql"
//
// async function createUser(email,password) {
//     var req_data = JSON.stringify({   //
//         query: `mutation userCreate ($email: String!, $password: String!) {
//     userCreate (email: $email, password: $password)
// }`,
//         variables: {"email":"Felic4534655ita.Bogan@yahoo.com","password":"WAKwfHd50_PSgQCZ"}
//         //variables: {"email": email, "password": password}
//     });
//     const { data } = await axios({
//         method: 'post',
//         url: API_URL,
//         data: req_data,
//         headers: {
//             //'Authorization' : `Bearer $(token)`,
//             'Content-Type': 'application/json'
//         }
//     });
//
//     if(data.errors) {
//         return {errors: data.errors}
//     } else {
//         const activetionLink = data.data.userCreate;
//         return (activetionLink);
//     }
// }

//REGISTRATION LINK
var axios = require('axios');
const API_URL = "https://enduring-server.herokuapp.com/v3/graphql"

async function req_Link(activationLinkId) {
    const mydata = JSON.stringify({
        query: `mutation userActivate ($activationLinkId: String!) {
    userActivate (activationLinkId: $activationLinkId)
}`,
        variables: { activationLinkId }
    });
    const { data } = await axios({
        method: 'post',
        url: API_URL,
        data: mydata,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log({
        activationString: activationString,
    })

    // if(data.errors) {
    //     return {errors: data.errors}
    // } else {
    //     const activetionLink = data.data.userActive;
    //     return (activetionLink);
    // }
}

req_Link()

module.exports = {
    createUser,
    req_Link
}