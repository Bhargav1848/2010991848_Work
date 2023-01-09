const createItem = (desc, deadline) => {
    var currentdate = new Date();
    let uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
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