function clearInput(selector) {
    while (selector.getValue() !== '') {    // while because we don1t know the length of the input
        selector.doubleClick();             // double click highlight the whole text
        selector.keys('Delete');
    }
}

function getInitials(name){
    let initials = "";
    for (let i = 0; i < name.length; i++){
        if (name[i] === " ")
            return (initials = name.charAt(name[0])+name.charAt(i + 1)).toUpperCase();
    }
}
module.exports = { clearInput, getInitials };            // curly braces because we can add some other methods in the arr