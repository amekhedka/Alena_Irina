const ProblemPage = require('../pageobjects/Problem.page')
const LoginPage = require('../pageobjects/Login.page')
const GlobalNavigation = require('../pageobjects/GlobalNavigation.page')
const { createANDLoginAPI } = require("../../helpers/methods")
const { createCompany } =  require('../../helpers/axios.methods')

describe('Problem functionality', () => {
let token = null;
let getCompanyID = null;

    before(() => {
        token = createANDLoginAPI("Manya111@test.com", "Manya111@");
        getCompanyID = createCompany({accessToken: token})
    });

    before(() => {
        browser.maximizeWindow();
    });

    it('Login and open problems Page', async () => {
        await LoginPage.fillLoginCredentials("Manya111@test.com", "Manya111@");
        await LoginPage.btnLogIn.click();
        await GlobalNavigation.btnMenu.click();
        await GlobalNavigation.problemsOption.click()
        await expect(ProblemPage.problemTitlePage).toHaveTextContaining("problems")
    });

    it('Search company by name Google', async () => {
        await ProblemPage.btnFilter.click();
        await ProblemPage.filterColumnDropDownMenu.selectByVisibleText("Company");
       // await ProblemPage.filterOperatorDropDownMenu.selectByVisibleText("starts with");
        await ProblemPage.filterValueDropDown.setValue("Google")
        const loader = ProblemPage.btnLoad;
        await expect(loader).not.toBeDisabled(); //типо ждем когда перестанет грузится
        await ProblemPage.btnFilter.click();
        const countRowProblems = await ProblemPage.problemRowsContainTextColumn("Google", "Company")
        await expect(countRowProblems.length).toEqual(10)
    });
});