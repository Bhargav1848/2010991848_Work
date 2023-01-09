export const deleteFunc = (id) => {
    const users = JSON.parse(localStorage.getItem("Users"));
    console.log(id);
    for (var i = 0; i < users.length; i++) {
        if (users[i].user_id == id) {
            users.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("Users", JSON.stringify(users));
    setTimeout(() => {
        window.location.reload();
    }, 600);
    console.log(users);
    return;
};