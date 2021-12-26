const Page = require('./Page');

class CompanyPage extends Page {

    get titleCompanyPage() {
        return $("//h6[text()='companies']");
    }

    get btnLoadMore() {
        return $("//div[@class='btn btn-link']");
    }

}


module.exports = new CompanyPage();















}