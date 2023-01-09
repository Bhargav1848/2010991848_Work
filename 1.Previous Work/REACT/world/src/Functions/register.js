export const register = (e) => {
    e.preventDefault();
    var element = document.getElementById("inputGroupFile01");
    let url = URL.createObjectURL(element.files[0]);
    let uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
    const data = {
        user_name: e.target[0].value,
        user_email: e.target[1].value,
        user_password: e.target[2].value,
        user_image: url,
        user_id: uniqueId,
    };
    if (data.user_name == "") {
        return "404";
    }
    if (localStorage.getItem("Users")) {
        let users = JSON.parse(localStorage.getItem("Users"));
        for (var i = 0; i < users.length; i++) {
            if (users[i].user_email == data.user_email) {
                return "302";
            }
        }
        users.push(data);
        localStorage.setItem("Users", JSON.stringify(users));
    } else {
        const dataToPush = [];
        dataToPush.push(data);
        localStorage.setItem("Users", JSON.stringify(dataToPush));
    }
    return "202";
};