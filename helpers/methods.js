const { createUser, registerActivationLink, userLogin } = require("../helpers/axios.methods")

async function clearInput(element){
    while(await element.getValue() !== ''){         // while because we don1t know the length of the input
        await element.doubleClick();                // double click highlight the whole text
        element.keys("Delete");
    }
}

async  function getInitials(name){
    let initials = "";
    for (let i = 0; i < name.length; i++){
        if (name[i] === " ")
            return (initials = name.charAt(name[0])+name.charAt(i + 1)).toUpperCase();
    }
}

async function createANDLoginAPI(email, password){
    const userCreateRes = createUser(email, password);
    if(userCreateRes.errors) console.log(userCreateRes.errors);

    const userActiveLink = registerActivationLink(activationLinkId);
    if(userActiveLink.errors) console.log(userActiveLink.errors);

    const userLoginRes = userLogin(email, password);
    if(userLoginRes.errors) console.log(userLoginRes.errors);

    return  userLoginRes.accessToken;
}
module.exports = { clearInput, getInitials, createANDLoginAPI };         // curly braces because we can add some other methods in the arr