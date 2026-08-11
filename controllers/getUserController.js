const getUserService = require("../services/getUserService");

function getUserController(req, res) {

    // Create URL object
    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    );

    // Get empCode from query parameter
    const empCode = url.searchParams.get("empCode");

    // Send empCode to service
    const user = getUserService(empCode);

    

    // User not found
    if (!user) {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            error: "User not found"
        }));

        return;
    }

    // Send user data
    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(user));
}

module.exports = getUserController;