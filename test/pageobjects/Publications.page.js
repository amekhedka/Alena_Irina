const Page = require ("./Page");

class PublicationsPage extends Page {



    open() {
        return super.open('/publications');
    }
}
module.exports = new PublicationsPage();