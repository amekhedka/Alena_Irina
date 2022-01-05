const Page = require('./Page');

class ProfilePage extends Page {

    get title () {
        return $("//h6[text()='user']");
    }

    get btnBack() {
        return $(".btn.btn-link")
    }

    get editBtn () {
        return $("//button[contains(text(), 'Edit')]");
    }

    get profileImageInitials () {
        return $("//div[@class='profile-image initials']");
    }

    get profileName() {
        return $("//div[@class = 'MuiTypography-root MuiTypography-h4 css-1xvinid']");
    }

    get profileData () {
        return $(".ant-col.p-3");
    }

    open() {
        return super.open('/profile');
    }
}
module.exports = new ProfilePage();

