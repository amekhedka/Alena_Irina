const Page = require ("./Page");

    class PublicationsPage extends Page {
        get publicationsTitle() {
            return $("//h6[text()='publications']")

        }

    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();