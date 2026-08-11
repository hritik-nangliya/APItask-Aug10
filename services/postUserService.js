const fs = require("fs");

function postUserService(newUser) {

    const filePath = "./data/users.json";

    // Check if users.json already exists
    if (fs.existsSync(filePath)) {

        // Read existing data
        const fileData = fs.readFileSync(filePath, "utf8");

        // Convert JSON string into JavaScript array
        const users = JSON.parse(fileData);

        // Add the new user
        users.push(newUser);

        // Save the updated array
        fs.writeFileSync(
            filePath,
            JSON.stringify(users, null, 2)
        );

        return newUser;

    } else {

        // File doesn't exist, so create it
        const users = [newUser];

        fs.writeFileSync(
            filePath,
            JSON.stringify(users, null, 2)
        );

        return newUser;
    }
}

module.exports = postUserService;