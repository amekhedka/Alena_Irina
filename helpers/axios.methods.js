// var axios = require('axios');
// var data = JSON.stringify({
//     query: `mutation userCreate ($email: String!, $password: String!) {
//     userCreate (email: $email, password: $password)
// }`,
//     variables: {"email":"Fred111@test.com","password":"Fred111@"}
// });
//
// var config = {
//     method: 'post',
//     url: 'https://enduring-server.herokuapp.com/v3/graphql',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     data : data
// };
//
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream'
})
    .then(function (response) {
        response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });


async function registerUser(){
  const userRegist = await axios({
      method: 'post',
      url: 'https://enduring-server.herokuapp.com/v3/graphql',
      data: requestData,
      headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
    //console.log(userRegist)
    console.log({
        data: userRegist.data,
        errors: userRegist.data.errors
    })
}
registerUser();