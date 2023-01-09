export const save = (e) => {
    e.preventDefault();
    var element = document.getElementById("inputGroupFile02");
    let url = "";
    try {
        url = URL.createObjectURL(element.files[0]);
    } catch (err) {
        console.log(err);
    }
    const path = window.location.pathname;
    var id = path.replace("/User/", "");
    const data = JSON.parse(localStorage.getItem("Users"));
    const user = data.find((o) => o.user_id === id);
    const new_data = {
        user_name: e.target[0].value,
        user_email: e.target[1].value,
        user_password: user.user_password,
        user_image: url !== "" ? url : user.user_image,
        user_id: user.user_id,
    };
    if (data.user_name == "") {
        return "404";
    }

    for (var i = 0; i < data.length; i++) {
        if (data[i].user_id != id && data[i].user_email == new_data.user_email) {
            return "302";
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].user_id == id) {
            data.splice(i, 1);
        }
    }
    data.push(new_data);
    localStorage.setItem("Users", JSON.stringify(data));
    return "602";
};