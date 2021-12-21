const Page = require ("./Page");

    class PublicationsPage extends Page {
        get publicationsTitle() {
            return $("//h6[text()='publications']")

        }
        get element(){
            return $('$("svg")')
        }
        get btnAddPost(){
            return $('//button[normalize-space()=\'Add Publication\']')
        }
        clickbtnAddPost() {
            this.btnAddPost.click();
        }

    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();