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

        get inputPostTitle(){
            return $("//input[@id='title']")
        }

        get inputLinkImage(){
            return $('#image')
        }

        get inputDescription(){
            return $('#description')
        }

        get inputContent(){
            return $('//textarea[@autocomplete=\'off\']')
        }

        get btnSavePost(){
            return $('button[type=\'submit\']')
        }

        get first_btnLike(){
            return $('(//button[@id=\'like-btn\'])[1]')
        }

        get first_btnComment(){
            return $('(//button[@id=\'comment-btn\'])[1]')
        }

        get btnLoadMore(){
            return $('//div[@class=\'btn-link\']')
        }

        get titlePlaceholder(){
            return $('#title-label')
        }

        get imagePlaceholder(){
            return $('#image-label')
        }

        get DescriptionPlaceholder(){
            return $('#description-label')
        }

        get ContentPlaceholder(){
            return $('//label[text()=\'Content\']')
        }

        async fillPost (title,imageLink, description, content) {
            //await this.open();
            await this.inputPostTitle.setValue(title);
            await this.inputLinkImage.setValue(imageLink);
            await this.inputDescription.setValue(description);
            await this.inputContent.setValue(content);
        }

    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();