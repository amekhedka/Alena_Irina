const Page = require ('./Page');

class MenuPage extends Page {

    get btnMenu() {
        return $("//*[name()='path' and contains(@d,'M3 18h18v-')]");
    }

    get publicationsOption(){
        return $("#publications");
    }

    get peopleOption(){
        return $("#people");
    }

    get companiesOption(){
        return $("#companies");
    }

    get problemsOption(){
        return $("#problems");
    }

    get profileOption(){
        return $("#profile");
    }

    get logOutOption(){
        return $("#logout");
    }

    clickPublications(){
        this.publicationsOption;
    }

    clickPeople(){
        this.peopleOption;
    }

    clickCompanies(){
        this.companiesOption;
    }

    clickProblems(){
        this.problemsOption;
    }

    clickProfile(){
        this.profileOption;
    }

    clickLogOut(){
        this.logOutOption.click();
    }

    open () {
        return super.open('Menu');
    }
}
module.exports = new MenuPage();