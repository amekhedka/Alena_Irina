const Page = require('./page');
const GlobalNavigationPage = require("../pageobjects/GlobalNavigation.page");

class ProblemsPage extends Page {

    get newProblem() {return $('//button[text()="New Problem"]');}

    get filterColumns() {return $('//button[@aria-label="Select columns"]');}

    get filterFilters() {return $('//button[@aria-label="Show filters"]');}

    get filterColumnDropDownMenu() {return $("//label[text()=\"Columns\"]/..//select");}

    get filterOperatorsDropDownMenu() {return $("(//label[text()=\"Operators\"]/..//select)[2]");}

    get filterValue() {return $("//label[text()='Value']/..//input");}

    get filterLoader() {return $("//*[contains(@data-testid,'LoadIcon')]");}

    get filterDensity() {return $('//button[@aria-label="Density"]');}

    get filterExport() {return $('//button[@aria-label="Export"]');}

    get columnsFind() {return $('//input[@class="MuiInput-input MuiInputBase-input css-mnn31"]');}

    get paginationBack() {return $('button[@aria-label="Go to previous page"]');}

    get paginationForward() {return $('button[@aria-label="Go to next page"]');}

    get problemsPageTitle() {return $('//h6[text()="problems"]')}

    get inputTitle() {return $('#title')}

    get inputCompanyName() {return $("//input[@id = 'company']")};

    get dropDownMenuCompany() {return $("//li[@id='company-option-0']")}

    get company() {return $("#company")}

    get dropDownMenu() {return $("//ul[@id='company-listbox']")}

    get inputPosition() {return $('#position')}

    get inputContent() {return $("//textarea[@class='w-md-editor-text-input ']")}

    get btnSave() {return $("//button[@type='submit']")}

    get problemsTitle() {return $("//*[contains(@class, 'textLeft') and @data-field='Problem name']")}

    get positionsTitle() {return $("//*[contains(@class, 'textLeft') and @data-field='Position']")}

    get companiesTitle() {return $("//*[contains(@class, 'textLeft') and @data-field='Company']")}

    get creatorsName() {return $("//*[contains(@class, 'textLeft') and @data-field='Creator']")}

    problemRowsContainTextInColumn(text, columnName){
        return $$(`//*[contains(text(), '${text}') and @data-field='${columnName}']`);}

    async getToProblemsPage() {
        await GlobalNavigationPage.clickMenu();
        await GlobalNavigationPage.clickProblems();
    }

    async selectCompany(company) {
        await this.company.click();
        const option = await $(`//li[contains(.,"${company}")]`);
        await option.click();
    }

    async fillProblemFormAndClickSave(title, company, position, content){
        await this.inputTitle.setValue(title);
        await this.selectCompany(company);
        await this.inputPosition.setValue(position);
        await this.inputContent.setValue(content);
        await this.btnSave.click();
    }
    open() {
        return super.open('/problems');
    }
}

module.exports = new ProblemsPage();