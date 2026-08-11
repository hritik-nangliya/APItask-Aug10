const postUserService = require("../services/postUserService");

function postUserController(req, res) {

    let body = "";

    // Receive the request body
    req.on("data", (chunk) => {
        body += chunk;
    });

    // Body completely received
    req.on("end", () => {

        try {

            // JSON string → JavaScript object
            const newUser = JSON.parse(body);

            // Send user to service
            const user = postUserService(newUser);

            // Send response
            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(user));

        } catch (error) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                error: "Invalid JSON"
            }));
        }
    });
}

module.exports = postUserController;