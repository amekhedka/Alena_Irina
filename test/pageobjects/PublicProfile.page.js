const Page = require('./Page');
class PublicProfile extends Page {
    get publicProfileTitle(){
        return $('//h6');
    }
    get userTagOnImage(){
        return $("//span[text()='user']");
    }
    get arrowBackButton(){
        return $("//div[@class='btn btn-link']//*[name()='svg']");
    }
    get menuButton(){
        return $("//button[@id='nav-bar-toggle']");
    }
}
module.exports = new PublicProfile();