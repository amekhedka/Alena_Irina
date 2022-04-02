const Page = require ("./Page");
//const chai = require('chai');

class PublicationsCreationPage extends Page {

    get inputPostTittle(){return $('#title')}

    get inputLinkImage(){return $('#image')}

    get inputDescription(){return $('#description')}

    get inputContent(){return $('//textarea[@autocomplete=\'off\']')}

    get btnSavePost(){return $('button[type=\'submit\']')}

    get titlePlaceholder(){return $('#title-label')}

    get imagePlaceholder(){return $('#image-label')}

    get DescriptionPlaceholder(){return $('#description-label')}

    get ContentPlaceholder(){return $('//label[text()=\'Content\']')}

    get warningLimitCharacters(){return $('//div[@class=\'MuiAlert-message css-1w0ym84\']')}

    get arrowBack(){return $('//*[name()=\'path\' and contains(@d,\'M20 11H7.8\')]')}

    async fillPost (title,imageLink, description, content) {
        await this.inputPostTittle.setValue(title);
        await this.inputLinkImage.setValue(imageLink);
        await this.inputDescription.setValue(description);
        await this.inputContent.setValue(content);
        await this.btnSavePost.click();
    }

    open() {
        return super.open('/publications/create');
    }
}

module.exports = new PublicationsCreationPage();