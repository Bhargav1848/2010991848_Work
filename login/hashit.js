function hashIt(password) {
    let newpassord = "";
    for (var i = 0; i < password.length; i++) {
        newpassord += String.fromCharCode(97 + ((password.charCodeAt(i) + 5) % 26));
    }
    return newpassord;
}

module.exports = hashIt;