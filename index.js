http = require("http");
fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    const data = JSON.parse(
    fs.readFileSync("users.json", "utf8")
);

res.end(JSON.stringify({
    username: data.username,
    empCode: data.empCode
})) ;

  } else if (req.method === "POST" && req.url === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      console.log("Body received:");
      console.log(body);

      fs.writeFileSync("users.json", body);

      res.end("Data received and written to file");
    });
  } else if (req.method === "PUT" && req.url === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newData = JSON.parse(body);

      const fileData = fs.readFileSync("users.json", "utf8");

      const user = JSON.parse(fileData);

      Object.assign(user, newData);

      fs.writeFileSync("users.json", JSON.stringify(user, null, 2));

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(user));
    });
  } else {
    // No matching route
    // Return 404
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
