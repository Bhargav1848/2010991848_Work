var currentdate = new Date();
const list = [{
    id: 1,
    description: "Do it",
    time: currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds(),
    deadline: "12/14/22",
    status: true,
}, ];
module.exports = list;