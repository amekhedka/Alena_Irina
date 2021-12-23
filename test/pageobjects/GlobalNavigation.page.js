const Page = require ('./Page');

class GlobalNavigationPage extends Page {

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

    open () {
        return super.open('/publications');
    }
}
module.exports = new GlobalNavigationPage();