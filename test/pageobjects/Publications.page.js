const Page = require ("./Page");
const chai = require('chai');

    class PublicationsPage extends Page {

        get publicationsTitle() {
            return $("//h6[text()='publications']")
        }

        get btnAddPost(){
            return $('//button[normalize-space()=\'Add Publication\']')
        }


    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();