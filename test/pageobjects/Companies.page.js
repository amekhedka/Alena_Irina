const Page = require('./Page');
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");

class CompaniesPage extends Page {

    get companiesPageTitle() {
        return $('//h6[text()="companies"]');
    }

    get firstCompanyCard() {
        return $('.d-flex .d-flex:nth-child(1) a:nth-child(1)');
    }

    get imageFirstCompany() {
        return $('(//img)[1]');
    }

    get nameFirstCompany() {
        return $('(//h2)[1]');
    }

    get descriptionFirstCompany() {
        return $('.d-flex .d-flex:nth-child(1) p');
    }

    get problemsFirstCompany() {
        return $('.d-flex .d-flex:nth-child(1) .mt-auto');
    }

    get loadMoreBtn() {
        return $('//div[text()="Load more..."]');
    }

    get anyCompanyCard() {
        return $("//div[@id=\"root\"]/div/div/div/p");
    };

    // get anyCompanyCardXPath() {
    //     return $("//div[@id='root']/div/div/div/p")
    // }

    get anyCompanyCardXPath() {
             return $("//div[@class]/a[@class]");
        }

    // selectorAnyCompanyCardXPath = "//div[@id='root']/div/div/div/p";
    selectorAnyCompanyCardXPath = "//div[@class]/a[@class]";

    selectorForAnyCompanyTitle = '//h2[@title]';

    get progressBar() {
        return $("//span[@role='progressbar']//*[name()='svg']");
    }

    async openCompany(){
        await this.openCompaniesPage();
        await this.firstCompanyCard.click();
    }

    async clickLoadMore() {
        await this.openCompaniesPage();
        await this.loadMoreBtn.click()
    }

    trimString(problemString){
        let newString = '';
        for(let i = 0; i < problemString.length; i++){
            if(problemString[i] !== ' '){
                newString += problemString[i]
            } else break;
        }
        return newString;
    }

    getBooleanNoMoreThan9(numOfRes, number){
        return !!(numOfRes <= number & numOfRes !== 0);
    }

    getBooleanNoMoreThan18(numOfRes, number){
        return !!(numOfRes <= number & numOfRes !== 0);
    }

    async getToCompaniesPage(){
        await GlobalNavigationPage.clickMenu();
        await GlobalNavigationPage.clickCompanies();
    }

    trimStringLeaveNumber(problemString){
        let newString = '';
        for(let i = problemString.length-1; i >= 0; i--){
            if(problemString[i] !== " "){
                newString += problemString[i]
            } else break;
        }
        return  newString.split("").reverse().join("");
    }

    openCompaniesPage() {
        return super.open("/companies");
    }
}


module.exports = new CompaniesPage();