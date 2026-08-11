const fs = require("fs");

function putUserService(empCode, newData) {

    const filePath = "./data/users.json";

    // Read existing users
    const fileData = fs.readFileSync(filePath, "utf8");

    const users = JSON.parse(fileData);

    // Find the user using empCode
    const user = users.find(
        user => user.empCode === empCode
    );

    // User doesn't exist
    if (!user) {
        return null;
    }

    // Update the provided fields
    Object.assign(user, newData);

    // Save updated users
    fs.writeFileSync(
        filePath,
        JSON.stringify(users, null, 2)
    );

    return user;
}

module.exports = putUserService;