const Page = require('./Page');
class ProblemProfile extends Page {
    get problemProfileTitle(){
        return $("//h6[@class=\'MuiTypography-root MuiTypography-h6 d-inline ml-3 css-1anx036\']");
    }
    get btnArrowBack(){
        return $("//div[@class='btn btn-link']//*[name()='svg']")
    }
    get btnAddNewSolution(){
        return $("//button[text()='Add New Solution']")
    }
    get inputOwnSolution(){
        return $("//div[@class='cm-editor ͼ1 ͼ2 ͼ4 ͼ1r ͼp']")
    }

}

module.exports = new ProblemProfile();
