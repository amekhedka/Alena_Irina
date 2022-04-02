const requestsAPI = require("../../requestsAPI/api_e2e_requests");
const Data = require("../../data/login.data");
const Chai = require('chai');
const chaiExpect = Chai.expect;
let accessTokenData = null;
let userID = null;
let firstName = "Alena";
let lastName = "Mekhedka";
let jobTitle = "QA";
let activationLink = null;
let postID = null;
let problemId = null;
let companyID = null;
let postTitle = `postTitle${Date.now()}`;
let postContent = "123456789";
let postDescription = "This version of ChromeDriver has not been tested with Chrome version 97";
let postImage = "https://d3fw5vlhllyvee.cloudfront.net/allspark/static/images/choose-who-moves-forward-f32d87.webp";
let messagePostDeleted = "Publication deleted"
let newPostTitle = "Hello";
let newPostContent = "newContent";
let newPostDescription = "QA";
let newPostImage = "https://www.projectdebug.com/wp-content/uploads/2020/10/image-4-768x371.png";
let commentID = null;
let commentContent = "I am learning JS"
let updateCommentContent = "I am learning JS in 202"
let companyTitle = `any text${Date.now()}`;
let companyDescription = "Hello";
let publicationTitle = `any text${Date.now()}`;
let publicationCompany = "617a183fb95fa7cfcbf1b82e";
let publicationJobTitle = "QA";
let publicationContent = "Hello";
let companyImage = "https://small-bizsense.com/wp-content/uploads/2018/09/it_service.jpg";
let companyLink = "https://www.intellective.com/";
let intOffset = 0;
let intLimit = 10;

describe('End to End API test', () => {

    it(' Verify a message is displayed if  the user tries to login with incorrect email', async () => {
        const errorMessage = await requestsAPI.userLogin(Data.userCredentials.wrongEmail, Data.userCredentials.password);
        expect(errorMessage).toEqual("Error: Incorrect username or password.");
    });

    it('The user gets activation link ID', async () => {
        activationLink = await requestsAPI.getActivationLinkByCreatingUser(Data.fakeCredentialsForRegistration.email, Data.fakeCredentialsForRegistration.password);
        expect(!!activationLink.activationLinkId).toBe(true);
    });

    it('Variant-#1 The user Activation Successful', async () => {
        const  resultOfActivation = await requestsAPI.registerActivationLink(activationLink.activationLinkId);
        expect(resultOfActivation.activationString).toEqual('Activation Successful!');
    });

    it('The user is able to login', async () => {
        accessTokenData  = (await requestsAPI.userLogin(Data.userCredentials.email, Data.userCredentials.password)).Token;
        const userID = await requestsAPI.userLogin(Data.userCredentials.email, Data.userCredentials.password);
        expect(!!accessTokenData).toBe(true);
        expect(!!userID.ID).toBe(true);
    });

    it('User creates post and gets postID', async () => {
       postID = await requestsAPI.userCreatePost({title:postTitle, description:postDescription, content:postContent, image: postImage, accessToken: accessTokenData});
       expect(postID).toEqual(postID)
    });

    //if tester can't get postID after running "userCreatePost" request, we can find created post by title or etc., using method ".find"
    it ('Find created postID by title', async () => {
        const listPosts = await  requestsAPI.getListPosts({offset: intOffset, limit:intLimit, accessToken: accessTokenData});
        const findPosts = listPosts.find(({title}) => title === postTitle);
        expect(findPosts.title).toEqual(postTitle);
    });

    it ('The user updates a post', async () => {
        const postUpdate = await requestsAPI.userUpdatePost({
            pubId: postID,
            values: {
                title: newPostTitle,
                description: newPostDescription,
                content: newPostContent,
                image: newPostImage
            },
            accessToken: accessTokenData
        });
        expect(postUpdate.statusText).toEqual('OK');
        chaiExpect(postUpdate.status).to.eq(200);
        chaiExpect(postUpdate.data).to.be.a('object');
        const res1 = JSON.stringify(postUpdate.data);
        const res2 = JSON.stringify({"data": {"publicationUpdate": {"_id": `${postID}`, "title": `${newPostTitle}`, "description": `${newPostDescription}`, "content": `${newPostContent}`, "image": `${newPostImage}`}}})
        chaiExpect(res1).equal(res2)
    });


    it("Verify the user parameters are  updated", async () => {
        accessTokenData = (await requestsAPI.userLogin(Data.userCredentials.email, Data.userCredentials.password)).Token;
        userID = (await requestsAPI.userLogin(Data.userCredentials.email, Data.userCredentials.password)).ID;
        const userUpdate = await requestsAPI.userUpdateData({
            userId: userID,
            values: {
                firstName,
                lastName,
                jobTitle
            },
            accessToken: accessTokenData
        })
        //console.log(JSON.stringify(userUpdate.userDataInfo) + "++++++++++++++++++++++++++")
        expect(!!userID).toBe(true);
        expect(userUpdate.userDataInfo.jobTitle).toEqual(jobTitle);
        expect(userUpdate.userDataInfo.firstName).toEqual(firstName);
        expect(userUpdate.userDataInfo.lastName).toEqual(lastName);
    })

    it("Verify how many users have `QA` job title with `Alena` name and first letter `M` in the last name ", async () => {
        const usersInfo = await requestsAPI.usersINFO({accessToken: accessTokenData, offset: 0, limit: Infinity})
        let count = 0;
        let userName = [];
        for (let user of usersInfo.userData) {
            if (user.jobTitle === "QA" && user.firstName.includes("Alena") && user.lastName.includes("M", 0)) {
                count++
                //userName.push(user);
            }
        }
       // console.log(count + "++++++++++++++++++++++++++++")
        expect(count >= 1)
        //console.log(userName)
        //console.log(userName.length > 1)
    });

    it('The user likes a post ', async () => {
        const userLike = await requestsAPI.userLikePost({pubId:postID, accessToken:accessTokenData});
        const userDislike = await requestsAPI.userLikePost({pubId:postID, accessToken:accessTokenData});
        await expect(userLike !== userDislike).toEqual(true);
    });

    it('The user updates 4 created comments successfully', async () => {
        for (let i = 1; i <= 4; i++) {
            let commentID = await requestsAPI.userCreateComment({
                parentId: postID,
                content: `${commentContent + ' ' + i}`,
                accessToken: accessTokenData
            })
            let updateComment = await requestsAPI.userUpdateComment({
                commentId: commentID._id,
                content: `${updateCommentContent + i}`,
                accessToken: accessTokenData
            })
            await expect(!!updateComment._id).toEqual(true);
            await expect(updateComment.parentId).toEqual(postID);
            await chaiExpect(updateComment.content).to.be.a("String");
            await chaiExpect(updateComment.content).to.equal(`${updateCommentContent + i}`);
        }
    });

    it('The user deletes post and gets successful message', async () => {
       const postDeleted =  await requestsAPI.userDeletePost({pubId:postID, accessToken: accessTokenData});
       expect(postDeleted).toEqual(messagePostDeleted);
    });

    it('The user creates company and gets companyID', async () => {
        companyID = await  requestsAPI.userCreateCompany({title: companyTitle, description:companyDescription, accessToken: accessTokenData});
        expect(!!companyID).toBe(true)
    });

    it('The user creates problem and gets problemID', async () => {
        problemId = await requestsAPI.problemCreate({title:publicationTitle, company:publicationCompany, jobTitle:publicationJobTitle, content:publicationContent, accessToken: accessTokenData });
        expect(!!problemId._id).toEqual(true);
        expect(problemId.title).toEqual(publicationTitle);
        expect(problemId.company._id).toEqual(publicationCompany);
    });

    it('The user deletes problem and gets successful message', async () => {
        const deleteProblem = await requestsAPI.userDeleteProblem(problemId._id,accessTokenData)
        expect(deleteProblem).toEqual("The Problem and all its Solutions have been deleted");
    });
});
