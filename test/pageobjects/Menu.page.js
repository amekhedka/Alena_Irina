const Page = require ('./Page');

class MenuPage extends Page {

    get btnMenu() {
        return $("#nav-bar-toggle");
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

    clickMenu(){
        this.btnMenu.click();
    }

    clickPublications(){
        this.publicationsOption.click();
    }

    clickPeople(){
        this.peopleOption.click();
    }

    clickCompanies(){
        this.companiesOption.click();
    }

    clickProblems(){
        this.problemsOption.click();
    }

    clickProfile(){
        this.profileOption.click();
    }

    clickLogOut(){
        this.logOutOption.click();
    }

    open () {
        return super.open('/menu');
    }
}
module.exports = new MenuPage();