const getUserController = require("../controllers/getUserController.js");
const postUserController = require("../controllers/postUserController.js");
const putUserController = require("../controllers/putUserController.js");

function userRoutes(req, res) {
  if (req.method === "GET" && req.url.startsWith("/users")) {
    getUserController(req, res);
  } else if (req.method === "POST" && req.url === "/users") {
    postUserController(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/users")) {
    putUserController(req, res);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "Not Found",
      }),
    );
  }
}

module.exports = userRoutes;
