const putUserService = require("../services/putUserService");

function putUserController(req, res) {

    // Get empCode from query parameter
    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    );

    const empCode = url.searchParams.get("empCode");

    let body = "";

    // Receive request body
    req.on("data", (chunk) => {
        body += chunk;
    });

    // Body completely received
    req.on("end", () => {

        try {

            // Convert JSON string → JavaScript object
            const newData = JSON.parse(body);

            // Send empCode and new data to service
            const updatedUser = putUserService(
                empCode,
                newData
            );

            // User not found
            if (!updatedUser) {

                res.writeHead(404, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    error: "User not found"
                }));

                return;
            }

            // Success
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(updatedUser));

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

module.exports = putUserController;