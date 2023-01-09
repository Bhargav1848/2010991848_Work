export const login = (e) => {
    e.preventDefault();
    const data = {
        user_email: e.target[0].value,
        user_password: e.target[1].value,
        user_asUser: e.target[3].checked,
        user_asAdmin: e.target[4].checked,
    };
    if (data.user_name == "" || data.user_email == "") {
        return "404";
    }
    var users = "";
    if (data.user_asUser) {
        users = JSON.parse(localStorage.getItem("Users"));
        for (var i = 0; i < users.length; i++) {
            console.log(users[i]);
            if (
                data.user_email == users[i].user_email &&
                data.user_password == users[i].user_password
            ) {
                return "102";
            }
        }
    } else {
        users = JSON.parse(localStorage.getItem("Admin"));
        if (
            data.user_email == users.user_email &&
            data.user_password == users.user_password
        ) {
            return "2";
        }
    }
    return "504";
};