const Page = require('./Page');

class ProblemPage extends Page {

    get problemTitlePage(){
        return $("//h6[text()='problems']")
    }

    get btnColumns(){
        return $("//button[contains(text(), 'Columns')]")
    }


    get btnFilter(){
        return $("//button[contains(text(), 'Filters')]")
    }

    get filterColumns(){
        return $("//select[@id='mui-764826778']")
    }

    get filterCompanyOption(){
        return $("//option[@value='Company']")
    }

    get filterOperation(){
        return $("//select[@id='mui-789853903']")
    }

    get filterContainsOption(){
        return $("//option[@value='contains']")
    }

    get inputValueFilter(){
        return $("//input[@id='mui-121440907']")
    }

    get previousPage(){
        return $("//button[@title='Go to previous page']")
    }

    get nextPage(){
        return $("//button[@title='Go to next page']")
    }

    get btnDensity(){
        return $("//button[contains(text(), 'Density')]")
    }

    get btnExport(){
        return $("//button[contains(text(), 'Export')]")
    }



}


module.exports = new ProblemPage();