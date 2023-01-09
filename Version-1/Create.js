const createItem = (desc, deadline, db) => {
    var currentdate = new Date();
    let uniqueId = 0;
    if (db.length != 0) {
        uniqueId = db[db.length - 1].id + 1;
    }
    const item = {
        id: uniqueId,
        description: desc,
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
        deadline: deadline,
        status: false,
    };
    return item;
};

module.exports = createItem;