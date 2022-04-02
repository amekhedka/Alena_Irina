const LoginPage = require("../pageobjects/Login.page");
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");
const CompaniesPage = require('../pageobjects/Companies.page');
const LoginData = require('../data/login.data');
const OneCompanyPage = require('../pageobjects/OneCompany.page');
const PublicationsPage = require("../pageobjects/Publications.page");
const PeoplePage = require("../pageobjects/People.page");
const ProblemsPage = require("../pageobjects/Problems.page");
const ProfilePage = require("../pageobjects/Profile.page");
const Chai = require("chai");
const chaiExpect = Chai.expect;
const fakeEmail = LoginData.fakeCredentialsUser2.email;
const fakePassword = LoginData.fakeCredentialsUser2.password;
const apiMethods = require("../helpers/apiMethods");
const uiMethods = require("../helpers/uiMethods");
const {loginUserViaAPI} = require("../helpers/apiMethods");
const {getActivationLinkByCreatingUser} = require("../helpers/apiMethods");

describe("CompaniesPage-1", () => {
    before(async () => {
        browser.maximizeWindow();
        const activationLink = await getActivationLinkByCreatingUser(fakeEmail, fakePassword);
        await apiMethods.registerActivationLink(activationLink);
        await LoginPage.login(fakeEmail, fakePassword);
    })

    it("CP-1: Verify that user is logged in", async () => {

        await expect(await PublicationsPage.publicationsTitle.getText()).toEqual("publications");
    })

    it("CP-2: Verify if it is the Companies page", async () => {
        await CompaniesPage.getToCompaniesPage();

        await chaiExpect(await CompaniesPage.companiesPageTitle.getText()).equal('companies');
    })

    it("CP-3: Verify that MenuButton navigation works from the Companies Page: to Publications", async () => {
        // await GlobalNavigationPage.clickMenu();
        // await GlobalNavigationPage.clickPublications();
        await PublicationsPage.getToPublicationsPage();

        await expect(await PublicationsPage.publicationsTitle.getText()).toEqual("publications");
    });

    it("CP-4: Verify that user can get back from the Publications Page to the Companies page", async () => {
        await CompaniesPage.getToCompaniesPage()

        await expect(await CompaniesPage.companiesPageTitle.getText()).toEqual("companies");
    });

    it("CP-5: Verify that MenuButton navigation works from the Companies Page: to People Page", async () => {
        await PeoplePage.getToPeoplePage();

        await expect(await PeoplePage.peopleTitle.getText()).toEqual("people");
    });

    it("CP-6: Verify that user can get back from the People Page to the Companies page", async () => {
        await CompaniesPage.getToCompaniesPage();

        await expect(await CompaniesPage.companiesPageTitle.getText()).toEqual("companies");
    });

    it("CP-7: Verify that MenuButton navigation works from the Companies to Problems", async () => {
        // await GlobalNavigationPage.clickMenu();
        // await GlobalNavigationPage.clickProblems();
        await ProblemsPage.getToProblemsPage();

        await expect(await ProblemsPage.problemsPageTitle.getText()).toEqual("problems");
    });

    it("CP-8: Verify that user can get back from the Problems page to the Companies page", async () => {
        await CompaniesPage.getToCompaniesPage();

        await expect(await CompaniesPage.companiesPageTitle.getText()).toEqual("companies");
    });

    it("CP-9: Verify that MenuButton navigation works from the Companies Page: to Profile", async () => {
        // await GlobalNavigationPage.clickMenu();
        // await GlobalNavigationPage.clickProfile();
        await ProfilePage.getToProfilePage();

        await expect(await ProfilePage.title.getText()).toEqual("user");
    });

    it("CP-10: Verify that user can get back from the Profile page to the Companies page", async () => {
        await CompaniesPage.getToCompaniesPage();

        await expect(await CompaniesPage.companiesPageTitle.getText()).toEqual("companies");
    });

    it("CP-11: Verify that MenuButton navigation works from the Companies Page: to Logout", async () => {
        await GlobalNavigationPage.clickMenu();
        await GlobalNavigationPage.clickLogOut();

        await expect(await LoginPage.titleOfInputEmailBox.getText()).toEqual("Email *");
        await expect(await LoginPage.titleOfInputPasswordBox.getText()).toEqual("Password *");
        await expect(await LoginPage.btnLogin.getText()).toEqual("LOGIN");
    });

    it("CP-12: Verify that the user again can be logged in and gotten back to the Companies page", async () => {
        await LoginPage.login(fakeEmail, fakePassword);
        await CompaniesPage.getToCompaniesPage();

        await expect(await CompaniesPage.companiesPageTitle.getText()).toEqual("companies");
    });

    it("CP-13: Verify is there the Problems word on 1st company card", async () => {
        const wordProblems = CompaniesPage.trimString(await CompaniesPage.problemsFirstCompany.getText());

        await expect(wordProblems).toEqual('Problems:');
    });

    it("CP-14: Verify that image of a company card is clickable", async () => {
        const boolean = await browser.waitUntil(() => CompaniesPage.imageFirstCompany.isClickable());

        await expect(boolean).toEqual(true);
    });

    it("CP-15: Verify that a company name is clickable", async () => {
        // const boolean = await browser.waitUntil(() => CompaniesPage.nameFirstCompany.isClickable());
        // expect(boolean).toEqual(true);

        await expect(await browser.waitUntil(() => CompaniesPage.nameFirstCompany.isClickable())).toEqual(true);
    });

    it("CP-16: Verify that there are no more than 9 company cards on a newly loaded screen", async () => {
        const res = await browser.$$(CompaniesPage.selectorAnyCompanyCardXPath);
        const numOfRes = res.length;

        await expect(CompaniesPage.getBooleanNoMoreThan9(numOfRes, 9)).toEqual(true);
    })

    it("CP-17: By clicking the Load More button more companies' cards were downloaded", async () => {
        const res1 = await browser.$$(CompaniesPage.selectorAnyCompanyCardXPath);
        const numOfRes1 = res1.length;
        await CompaniesPage.loadMoreBtn.scrollIntoView();
        await CompaniesPage.loadMoreBtn.click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        const res2 = await browser.$$(CompaniesPage.selectorAnyCompanyCardXPath);
        const numOfRes2 = res2.length;

        await expect(numOfRes1 < numOfRes2).toEqual(true);
    });

    it("CP-18: No more than 9 new cards were downloaded", async () => {
        const res3 = await browser.$$(CompaniesPage.selectorAnyCompanyCardXPath);
        const numOfRes3 = res3.length;

        await expect(CompaniesPage.getBooleanNoMoreThan18(numOfRes3, 18)).toEqual(true);
    })

    it("CP-19: Verify that a user is redirected to FirstCompanyCard by clicking on it", async () => {
        await CompaniesPage.firstCompanyCard.scrollIntoView();
        await CompaniesPage.firstCompanyCard.click();

        await expect(await OneCompanyPage.companyPageTitle.getText()).toEqual('company');
        await expect(await OneCompanyPage.btnBack.isExisting());
    })

    it("CP-20: Verify user got back to the Companies Page", async () => {
        await OneCompanyPage.btnBack.click();
        await browser.waitUntil(() => CompaniesPage.anyCompanyCardXPath.isClickable());
        const numberOfCards =  await browser.$$(CompaniesPage.selectorAnyCompanyCardXPath).length;
        await expect(numberOfCards === 18).toEqual(true);
    });

    it("CP-21: Verify that companies cards are shown by ascendant order by Title", async () => {
        await expect(await uiMethods.returnBooleanArrayIsASCOrder(CompaniesPage.selectorForAnyCompanyTitle)).toEqual(true);
    });

    it("CP-22: User has been deleted via API", async () => {
        const userId = (await loginUserViaAPI(fakeEmail, fakePassword))._userId;
        const accessToken = (await loginUserViaAPI(fakeEmail, fakePassword)).accessTok;
        const message = await apiMethods.deleteUserFromDataBase(userId, accessToken);
        console.log(message);

        await expect(message).toEqual("User Deleted");
    })
})
describe("CompaniesPage-2", () => {
    before(async () => {
        browser.maximizeWindow();
        const activationLink = await getActivationLinkByCreatingUser(fakeEmail, fakePassword);
        await apiMethods.registerActivationLink(activationLink);
        await LoginPage.login(fakeEmail, fakePassword);
    })

    it("CP-23: Verify that counter of Problems on the Company card works well ", async () =>{
        await CompaniesPage.getToCompaniesPage();
        const element = await CompaniesPage.problemsFirstCompany.getText();
        const number = CompaniesPage.trimStringLeaveNumber(element);

        await ProblemsPage.getToProblemsPage();
        let i = 1;
        do {
            await ProblemsPage.newProblem.click();
            await ProblemsPage.inputTitle.setValue(`Task${new Date().getMilliseconds()*1.33*new Date().getSeconds()}`);
            await ProblemsPage.inputCompanyName.click();
            await browser.$("//li[@id='company-option-0']").click();
            await ProblemsPage.inputPosition.setValue("The Best QA Engineer Ever");
            await ProblemsPage.inputContent.setValue(`Content for the Task # ${i}`);
            await ProblemsPage.btnSave.click();
            i++;
        }
        while (i <= 5);

        await browser.pause(3000);
        await CompaniesPage.getToCompaniesPage();
        browser.pause(5000);
        const string = await CompaniesPage.problemsFirstCompany.getText();
        const newNumber = CompaniesPage.trimStringLeaveNumber(string);
        await expect(newNumber - number >= 5).toEqual(true);
    })

    it("CP-24: Delete created problems and verify they are deleted", async () => {
        const userId = (await apiMethods.loginUserViaAPI(fakeEmail, fakePassword))._userId;
        const accessToken = (await apiMethods.loginUserViaAPI(fakeEmail, fakePassword)).accessTok;
        const arr = await apiMethods.returnListOfProblemObjects(accessToken, 10);
        const listOfIdOfProblems = [];
        for(let i = 0; i < arr.length; i++) {
            if(arr[i]["owner"] === null) break;
            if (arr[i]["owner"]["_id"] === userId) {
                listOfIdOfProblems.push(arr[i]["_id"]);
            }
        }
        console.log(listOfIdOfProblems);
        for(let i = 0; i < listOfIdOfProblems.length; i++){
            const message = await apiMethods.deleteProblem(listOfIdOfProblems[i], accessToken);

            expect(message).toEqual("The Problem and all its Solutions have been deleted")
        }
    })

    it("CP-25: User has been deleted via API", async () => {
        const userId = (await loginUserViaAPI(fakeEmail, fakePassword))._userId;
        const accessToken = (await loginUserViaAPI(fakeEmail, fakePassword)).accessTok;
        const message = await apiMethods.deleteUserFromDataBase(userId, accessToken);
        console.log(message);

        await expect(message).toEqual("User Deleted");
    })
})
