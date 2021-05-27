// Use Express
const express = require("express");
// Use body-parser
const bodyParser = require("body-parser");

// Create new instance of the express server
const app = express();
const sendEmail = require('./utils/sendEmail');

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

app.post("/api/sendEmail", function (req, res) {
  const { email, site } = req.body;
  res.end('It worked!');
  sendEmail(email, site);
});
