const axios = require('axios');
const {attachConsoleLogs} = require("@wdio/allure-reporter/build/utils");
const API_URL = "https://enduring-server.herokuapp.com/v3/graphql";
const Data = require("../data/login.data");

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
            'Content-Type': 'application/json'
        }
    });

    if (data.errors) {
        return {errors: data.errors}
    } else {
        const activationLinkId = data.data.userCreate;
        return { activationLinkId };
    }
}

async function registerActivationLink(activationLinkId) {
    const dataUserActivate = JSON.stringify({
        query: `mutation userActivate ($activationLinkId: String!) {
    userActivate (activationLinkId: $activationLinkId)
}`,
        variables: { activationLinkId }
    });

    const {data} = await axios({
        method: 'post',
        url: API_URL,
        data: dataUserActivate,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (data.errors) {
        return {errors: data.errors}
    } else {
        const activationString = data.data.userActivate;
        return { activationString: activationString };
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
        return {errors: (userData.data.errors)[0].message}
    } else {
        return userData;
    }
}

async function userLogin (email, password) {
    const reqData = JSON.stringify({
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

    const userLogin = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //console.log((userLogin.data.errors)[0].message); //example how to find only message
    if (userLogin.data.errors) {
        const message = (userLogin.data.errors)[0].message;
        return message ;
    } else {
        const accessToken = userLogin.data.data.login.accessToken;
        const userID = userLogin.data.data.login.user._id;
        return { Token: accessToken,
                 ID: userID};
    }
}

async function usersINFO ({accessToken, offset, limit}) {
    const reqData = JSON.stringify({
        query: `query users ($offset: Int, $limit: Int) {
    users (offset: $offset, limit: $limit) {
        list {
            _id
            email
            firstName
            lastName
            about
            image
            jobTitle
            level
            languages
        }
    }
}`,
        variables: {"offset": offset, "limit": limit}
    });
const usersData = await axios({
    method: 'post',
    url: API_URL,
    data: reqData,
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    });
    if(usersData.data.errors){
        const error = usersData.data.errors;
        return error;
    }
    else {
        const userData = usersData.data.data.users.list;
        return {userData};
    }
}

async function userUpdateData ({
                                   userId,
                                   values: {
                                       firstName,
                                       lastName,
                                       jobTitle,
                                   },
                                   accessToken
                               })
{
    const reqData = JSON.stringify({
        query: `mutation userUpdate ($userId: ID!, $values: UserInput) {
    userUpdate (userId: $userId, values: $values) {
        _id
        email
        firstName
        lastName
        about
        image
        jobTitle
        level
        languages
    }
}`,
        variables: {
            userId,
            values:{
                firstName,
                lastName,
                jobTitle
            }
        }
    });
    const usersData = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if(usersData.data.errors){
        const error = usersData.data.errors;
        return error;
    }
    else {
        const userDataInfo = usersData.data.data.userUpdate;
        return {userDataInfo};
    }
}


async function userCreatePost({
                                  title,
                                  description,
                                  content,
                                  accessToken,
                              })
{
const reqData = JSON.stringify({
    query: `mutation publicationCreate ($values: PublicationInput) {
    publicationCreate (values: $values) {
        _id
        title
        description
        content
}
}`,
    variables: {
        values: {
            title,
            description,
            content
        }
    }
});
    const createPost = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if(createPost.data.errors) {
        const errors = (createPost.data.errors)[0].message;
        return errors;
    }else{
        const postID = (createPost.data.data.publicationCreate)._id;
        return postID;
    }
}

async function getListPosts({
                                offset,
                                limit,
                                accessToken
                            }) {
  const reqData = JSON.stringify({
        query: `query publications ($offset: Int, $limit: Int) {
    publications (offset: $offset, limit: $limit) {
        _id
        title
    }
}`,
        variables: {
            offset,
            limit
        }
    });

    const listPosts = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (listPosts.data.errors){
        const errors = listPosts.data.errors[0].message;
        return errors;
        }else{
        const posts = listPosts.data.data.publications;
        return  posts;
    }
}

async function userUpdatePost({
                                  pubId,
                                  values: {
                                      title,
                                      description,
                                      content,
                                      image
                                  },
                                  accessToken
                              }) {
    const reqData = JSON.stringify({
        query: `mutation publicationUpdate ($pubId: ID!, $values: PublicationInput) {
    publicationUpdate (pubId: $pubId, values: $values) {
        _id
        title
        description
        content
        image
}
}`,
        variables: {
            pubId,
            values: {
                title,
                description,
                content,
                image
            }
        }
    });
    const updatePost = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
           'Authorization': `Bearer ${accessToken}`,
            //'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpdGFsaWlhcnQxOTc3K3VzZXJAZ21haWwuY29tIiwiX2lkIjoiNjFjN2M1ZjZmYWRhMDJiOWUwNWI5MzUyIiwiaXNBY3RpdmF0ZWQiOnRydWUsImlhdCI6MTY0MzY3MzExMiwiZXhwIjoxNjQzNjgwMzEyfQ.RC-tUe4BlV93THboFRH5QROXQtk9jL18A59lmqAe5RE",
            'Content-Type': 'application/json'
        }
    });
    if(updatePost.data.errors) {
        const errors = (updatePost.data.errors)[0].message;
        return errors;
    }else{
        const updatedContent = updatePost;
        return updatedContent;
    }
}

async function userLikePost({pubId, accessToken}){
    const reqData = JSON.stringify({
        query: `mutation publicationLike ($pubId: ID!) {
    publicationLike (pubId: $pubId) {
        _id
        title
    }
}`,
        variables: { pubId }
    });

    const likePost = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (likePost.data.errors) {
        const errors = (likePost.data.errors)[0].message;
        return errors;
    } else {
        const like = likePost.data.data.publicationLike;
        return like;
    }
}

async function userCreateComment({parentId, content, accessToken}){
   const reqData =  JSON.stringify({
        query: `mutation commentCreate ($parentId: ID!, $content: String!) {
    commentCreate (parentId: $parentId, content: $content) {
        _id
        parentId
        content
        likes {
            _id
            email
            firstName
    }
    }
}`,
        variables: {parentId, content }
    });

    const createComment = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if(createComment.data.errors) {
        const errors = (createComment.data.errors)[0].message;
        return errors;
    }else{
        const commentCreate = createComment.data.data.commentCreate;
        return commentCreate;
    }
}

async function userUpdateComment({commentId, content, accessToken}){
    const reqData =  JSON.stringify({
        query: `mutation commentUpdate ($commentId: ID!, $content: String!) {
    commentUpdate (commentId: $commentId, content: $content) {
        _id
        parentId
        content
        }
}`,
        variables: { commentId, content }
    });

    const updateComment = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if(updateComment.data.errors) {
        const errors = (updateComment.data.errors)[0].message;
        return errors;
    }else{
        const commentUpdate = updateComment.data.data.commentUpdate;
        return commentUpdate;
    }
}

async function userDeletePost({pubId, accessToken}){
    const reqData = JSON.stringify({
        query: `mutation publicationDelete ($pubId: ID!) {
    publicationDelete (pubId: $pubId)
}`,
        variables: { pubId }
    });

    const deletePost = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if(deletePost.data.errors) {
        const errors = (deletePost.data.errors)[0].message;
        return errors;
    }else{
        const messagePostDeleted = deletePost.data.data.publicationDelete;
        return messagePostDeleted;
    }
}

async function userCreateCompany({
                                     title,
                                     description,
                                     accessToken
                                 }) {
    const queryData = JSON.stringify({
        query: `mutation companyCreate ($data: CompanyInput) {
    companyCreate (data: $data) {
        _id
        title
        description
        image
        link
        problems {
            _id
            title
    }
}
}`,
        variables: {
            data: {
                title,
                description,
            }
        }
    });
    const createCompany = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (createCompany.data.data.errors) {
        const errors = (createCompany.data.errors)[0].message;
        return errors;
    } else {
        const companyData = (createCompany.data.data.companyCreate)._id;
        return companyData;
    }
}

async function problemCreate({
                                 title,
                                 content,
                                 company,
                                 jobTitle,
                                 accessToken
                             }) {
    const queryData = JSON.stringify({
        query: `mutation problemCreate ($data: ProblemInput) {
    problemCreate (data: $data) {
        _id
        title
        content
        company {
            _id
}
    }
}`,
        variables: {
            data: {
                title,
                content,
                company,
                jobTitle
            }
        }
    });
    const createProblem = await axios({
        method: 'post',
        url: API_URL,
        data: queryData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if (createProblem.data.data.errors) {
        const errors = createProblem.data.data.errors;
        return errors;
    } else {
        const problemData = createProblem.data.data.problemCreate;
        return problemData;
    }
}

async function userDeleteProblem(problemId, accessToken){
    const reqData = JSON.stringify({
        query: `mutation problemDelete ($problemId: ID!) {
    problemDelete (problemId: $problemId)
}`,
        variables: {"problemId": problemId}
    });
    const deleteProblem = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if(deleteProblem.data.data.errors){
        const errors = (deleteProblem.data.data.errors)[0].message;
        return errors;
    }else{
        const problemMessageDelete = deleteProblem.data.data.problemDelete;
        return problemMessageDelete;
    }
}

async function deleteUser(userId, accessToken){
    const reqData = JSON.stringify({
        query: `mutation userDelete ($userId: ID!) {
    userDelete (userId: $userId)
}`,
        variables: {"userId":userId}
    });
    const userDelete = await axios({
        method: 'post',
        url: API_URL,
        data: reqData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })

    if (userDelete.data.errors) {
         const message = (userDelete.data.errors)[0].message;
         return message;
    } else {
     const messageDelete = userDelete.data.data.userDelete;
     return messageDelete;
  }
}

module.exports = {
    getActivationLinkByCreatingUser,
    registerActivationLink,
    getActivationDataByCreatingUser,
    userLogin,
    usersINFO,
    userUpdateData,
    userCreatePost,
    userLikePost,
    getListPosts,
    userUpdatePost,
    userCreateComment,
    userUpdateComment,
    userDeletePost,
    userCreateCompany,
    problemCreate,
    userDeleteProblem,
    deleteUser,
}
