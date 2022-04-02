const Page = require('./Page');

class OneCompanyPage extends Page {

    get companyPageTitle () { return $('//h6[text()="company"]'); }

    get btnBack() { return $('//div[@class=\'btn btn-link\']'); }

    get oneCompanyImage() { return $('//div[@class = "ant-image"]/img'); }

    get oneCompanyName() { return $('.mr-3.mb-3 h2'); }

    get oneCompanyDescription() { return $('.mr-3.mb-3 p'); }

    get technicalTasksSentence() { return $('//h5[text()="Technical tasks given during the interview:"]'); }

    get firstTechnicalTaskLink() { return $('.d-flex:nth-child(1) a:nth-child(1)'); }

    get titleFirstTechnicalTask() { return $('.d-flex:nth-child(1) a:nth-child(1) h6'); }

    get positionFirstTechnicalTask() { return $('a:nth-child(1) .text-truncate:nth-child(2)'); }

    get likeBtn(){ return $('#like-btn'); }

    get numberOflikes(){ return $('#like-btn .ml-1'); }

    get accountImage(){ return $('.d-inline-block img'); }

    get commentBtn(){ return $('#comment-btn'); }

    get inputCommentField(){ return $('#comment-input'); }

    get sendBtn(){ return $('#send-btn'); }

    async oneCompanyPage() {
        await this.openOneCompanyPage();
        await this.likeBtn.click();
        await this.commentBtn.click();
        await this.firstTechnicalTaskLink();
    }

    async moveBackToCompanies() {
        await this.openOneCompanyPage();
        await this.btnBack.click()
    }

    openOneCompanyPage(){
        return super.open("/company/617a183fb95fa7cfcbf1b82e");
    }
}

module.exports = new OneCompanyPage();