let title = `Task${Date.now()}`;
let companyName = "L + V";
let position = "QA";
let content = "IT";
let filterNameOfColumn = "Company";
let filterOperatorName = "equals";
let nameOfColumn = "Company";
let anyText = "problems";
const LoginPage = require('../pageobjects/Login.page');
const LoginData = require('../data/login.data');
const ProblemsPage = require('../pageobjects/Problems.page');
const ProblemsCreatePage = require('../pageobjects/ProblemsCreate.page');
const globalNavigationPage = require("../pageobjects/GlobalNavigation.page");
const OneProblemProfilePage = require("../pageobjects/OneProblemProfile.page");

 describe("Problems Page", () => {
     before (async () => {
          browser.maximizeWindow();
          await LoginPage.login(LoginData.userCredentials.email, LoginData.userCredentials.password);
          //Uncomment lines if needed to run only one test
          // await globalNavigationPage.clickMenu();
          // await globalNavigationPage.clickProblems();
          // await ProblemsPage.filterFilters.waitForDisplayed({timeout:7000});
     });

     it ('should problemsTitle be exist and has text problems', async () => {
         await globalNavigationPage.clickMenu();
         await globalNavigationPage.clickProblems();
         await expect(ProblemsPage.problemsPageTitle).toBeExisting();
         await expect(await ProblemsPage.problemsPageTitle).toHaveTextContaining(anyText);
     })

     it ('Verify that user is redirected to problemsCreate page', async () => {
         await ProblemsPage.newProblem.click();
         await expect(await ProblemsCreatePage.inputTitle).toBeExisting();
         await expect(await ProblemsCreatePage.selectCompany).toBeExisting();
         await expect(await ProblemsCreatePage.inputPosition).toBeExisting();
         await expect(await ProblemsCreatePage.inputContent).toBeExisting();
     })

      it ('Verify that user can get back from the OneProblemProfile page to the Problem page', async () => {
         await OneProblemProfilePage.btnArrowBack.click();
         await expect(ProblemsPage.problemsPageTitle).toHaveTextContaining(anyText);
         await expect(ProblemsPage.newProblem).toBeExisting();
         await expect(ProblemsPage.filterColumns).toBeExisting();
         await expect(ProblemsPage.filterDensity).toBeExisting();
         await expect(ProblemsPage.filterFilters).toBeExisting();
      })

     it('Verify problems are created', async () => {
         for(let i = 1; i <= 2; i++ ) {
             await ProblemsPage.newProblem.click();
             await ProblemsPage.fillProblemFormAndClickSave(title + `${i}`, companyName, position + `${i}`, content);
             const problemTitle = await ProblemsPage.problemsTitle.getText();
             const companyTitle = await ProblemsPage.companiesTitle.getText()
             const positionTitle = await ProblemsPage.positionsTitle.getText();
             await expect(problemTitle).toEqual(title + `${i}`);
             await expect(companyTitle).toEqual(companyName);
             await expect(positionTitle).toEqual(position + `${i}`);
         }
     })

     it('Search company by name and verify problem rows contain correctly text in column on the first page', async () => {
         await ProblemsPage.filterFilters.click();
         await ProblemsPage.filterColumnDropDownMenu.selectByVisibleText(filterNameOfColumn) ;
         await ProblemsPage.filterOperatorsDropDownMenu.click();
         await ProblemsPage.filterOperatorsDropDownMenu.selectByVisibleText(filterOperatorName);
         await ProblemsPage.filterValue.click();
         await ProblemsPage.filterValue.waitForDisplayed({timeout:7000});
         await ProblemsPage.filterValue.setValue(companyName);
         const Loader = ProblemsPage.filterLoader;
         await expect(Loader).not.toBeDisplayed();
         await ProblemsPage.filterFilters.click();
         const countProblems = await ProblemsPage.problemRowsContainTextInColumn(companyName, nameOfColumn);
         await expect (countProblems).toHaveLength(10);
     })
})