const LoginPage = require("../pageobjects/Login.page");
const LoginData = require('../data/login.data');
const globalNavigationPage = require("../pageobjects/GlobalNavigation.page");
const PeoplePage = require("../pageobjects/People.page")
const PublicationsPage = require("../pageobjects/Publications.page");
const CompaniesPage = require("../pageobjects/Companies.page");
const ProfilePage = require("../pageobjects/Profile.page");
const {userCredentials} = require("../data/login.data");
const ProblemsPage = require("../pageobjects/Problems.page");
const PublicProfilePage = require("../pageobjects/PublicProfile.page");
const Chai = require('chai');
const chaiExpect = Chai.expect;

describe("People page", () => {

    before( async () => {
       await browser.maximizeWindow();
       await LoginPage.login(userCredentials.email, userCredentials.password);
    });

    it("PP-1: Verify if it is the People page", async () => {
        await globalNavigationPage.clickMenu();
        await globalNavigationPage.clickPeople();
        await browser.waitUntil(() => PeoplePage.peopleTitle.isDisplayed());

        await expect(await PeoplePage.peopleTitle.getText()).toEqual("people");
    });

    it("PP-2: Verify that MenuButton navigation works from the PeoplePage: to Publications", async () => {
        await globalNavigationPage.clickMenu();
        await globalNavigationPage.clickPublications();

        await expect(await PublicationsPage.publicationsTitle.getText()).toEqual("publications");
    });

    it("PP-3: Verify that user can get back from the Publication page to the People page", async () => {
        await PeoplePage.getToPeoplePage();
        await expect(await PeoplePage.peopleTitle.getText()).toEqual("people");
    });

    it("PP-4: Verify that MenuButton navigation works from the PeoplePage: to Companies", async () => {
        await globalNavigationPage.clickMenu();
        await globalNavigationPage.clickCompanies();

        await expect(await CompaniesPage.companiesPageTitle.getText()).toEqual("companies");
    });

    it("PP-5: Verify that user can get back from the Companies page to the People page", async () => {
        await PeoplePage.getToPeoplePage();

        await expect(await PeoplePage.peopleTitle.getText()).toEqual("people");
    });

    it("PP-6: Verify that MenuButton navigation works from the PeoplePage: to Problems", async () => {
        await globalNavigationPage.clickMenu();
        await globalNavigationPage.clickProblems();

        await expect(await ProblemsPage.problemsPageTitle.getText()).toEqual("problems");
        });

    it("PP-7: Verify that user can get back from the Problems page to the People page", async () => {
        await PeoplePage.getToPeoplePage();

        await expect(await PeoplePage.peopleTitle.getText()).toEqual("people");
    });

    it("PP-8: Verify that MenuButton navigation works from the PeoplePage: to Profile", async () => {
        await globalNavigationPage.clickMenu();
        await globalNavigationPage.clickProfile();

        await expect(await ProfilePage.title.getText()).toEqual("user");
    });

    it("PP-9: Verify that user can get back from the Profile page to the People page", async () => {
        await PeoplePage.getToPeoplePage();

        await expect(await PeoplePage.peopleTitle.getText()).toEqual("people");
    });

    it("PP-10: Verify that MenuButton navigation works from the PeoplePage: to Logout", async () => {
        await globalNavigationPage.clickMenu();
        await globalNavigationPage.clickLogOut();

        await expect(await LoginPage.titleOfInputEmailBox.getText()).toEqual("Email *");
        await expect(await LoginPage.titleOfInputPasswordBox.getText()).toEqual("Password *");
        await expect(await LoginPage.btnLogin.getText()).toEqual("LOGIN");
    });

    it("PP-11: Verify that the user again can be logged in and gotten back to the People page", async () => {
        await LoginPage.login(LoginData.userCredentials.email,LoginData.userCredentials.password);
        await PeoplePage.getToPeoplePage();

        await expect(await PeoplePage.peopleTitle.getText()).toEqual("people");
    });

    it("PP-12: Verified that user image is clickable", async () =>{
        await browser.waitUntil(() => PeoplePage.firstUserImage.isClickable());

        await expect(await PeoplePage.firstUserImage.isClickable()).toEqual(true);
    });

    it("PP-13: Verified that user name/title is clickable", async () =>{
        await browser.waitUntil(() => PeoplePage.firstUserTitle.isClickable());

        await expect(await PeoplePage.firstUserTitle.isClickable()).toEqual(true);
    });

    it("PP-14: Verified that user job title is clickable", async () =>{
        await browser.waitUntil(() => PeoplePage.firstUserJobTitle.isClickable());

        expect(await (PeoplePage.firstUserJobTitle).isClickable()).toEqual(true);
    });

    it("PP-15: Verify that user is redirected to any user public profile page", async () => {
        await PeoplePage.firstUserLink.click();

        await expect(await PublicProfilePage.publicProfileTitle.getText()).toEqual("user");
    })

});