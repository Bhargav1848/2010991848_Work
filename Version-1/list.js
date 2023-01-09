var currentdate = new Date();
const db = [{
        id: 1,
        description: "Learn new concepts of ML",
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
        deadline: "2022-11-21",
        status: true,
    },
    {
        id: 2,
        description: "Work on Project",
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

        deadline: "2022-11-20",
        status: false,
    },
    {
        id: 3,
        description: "Assignment Pending",
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

        deadline: "2022-11-22",
        status: true,
    },
];
module.exports = db;