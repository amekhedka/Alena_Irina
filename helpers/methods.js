function clearInput(selector) {
    while (selector.getValue() !== '') {    // while because we don1t know the length of the input
        selector.doubleClick();             // double click highlight the whole text
        selector.keys('Delete');
    }
}
module.exports = { clearInput };            // curly braces because we can add some other methods in the arr
