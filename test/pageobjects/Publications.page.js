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
        get inputPostTittle(){
            return $('#title')
        }
        get inputLinkImage(){
            return $('#image')
        }
        get inputDescription(){
            return $('#description')
        }
        get inputContent(){
            return $('.w-md-editor-text-input')
        }
        get btnSavePost(){
            return $('button[type=\'submit\']')
        }
        clickbtnAddPost() {
            this.btnAddPost.click();
        }
        clickbtnSavePost(){
            this.btnSavePost.click()
        }

        async fillPost (title,imageLink, description, content) {
            await this.open();
            //await this.inputPostTittle.click()
            await this.inputPostTittle.setValue(title);
           // await this.inputLinkImage.click()
            await this.inputLinkImage.setValue(imageLink);
            //await this.inputDescription.click()
            await this.inputDescription.setValue(description);
            //await this.inputContent.click()
            await this.inputContent.setValue(content);
            await this.btnSavePost.click()
        }

    open() {
        return super.open('/publications');
    }
}

module.exports = new PublicationsPage();