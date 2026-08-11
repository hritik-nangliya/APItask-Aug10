const fs = require("fs");

function getUserService(empCode) {

    const fileData = fs.readFileSync(
        "./data/users.json",
        "utf8"
    );

    const users = JSON.parse(fileData);

    const user = users.find(
        user => user.empCode === empCode
    );

    // No empCode → return all users
    if (!empCode) {
        return users;
    }

    if (!user) {
        return null;
    }

    return {
        username: user.username,
        empCode: user.empCode,
        department: user.userInfo.department,
        city: user.userInfo.city
    };
}

module.exports = getUserService;