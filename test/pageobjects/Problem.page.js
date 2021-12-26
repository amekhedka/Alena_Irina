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

    get btnDensity(){
        return $("//button[contains(text(), 'Density')]")
    }

    get btnExport(){
        return $("//button[contains(text(), 'Export')]")
    }


    get previousPage(){
        return $("//button[@title='Go to previous page']")
    }

    get nextPage(){
        return $("//button[@title='Go to next page']")
    }

     problemRowsContainTextColumn (text, column ) {
        return $$(`//*[contains(text(),"${text}") and @data-field='${column}']`);    //TODO://*[contains(text(),"Google") and @data-field='Company']
    }

    get filterColumnDropDownMenu(){
        return $("//label[text()=\'Columns\']/..//select");
    }

    get filterOperatorDropDownMenu(){
        return $("//label[(text()='Operators') and @id='mui-915659871']/..//select");
    }

    get filterValueDropDown(){
        return $("//label[text()='Value']/..//input");
    }

    get btnLoad(){
        return $("//*[@data-testid='LoadIcon']");
    }



    open() {
        return super.open('/problems');
    }

}


module.exports = new ProblemPage();