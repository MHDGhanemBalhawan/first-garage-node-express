const express = require("express");
const app = express();
const path = require("path");
const formidable = require("express-formidable");
const morgan = require("morgan");
const fs = require("fs");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

app.use(express.static("public", { extensions: ["html"] }));
// import morgan from "morgan";

app.use(morgan("tiny"));

app.use(bodyParser.json());

// const publicPath = path.join(__dirname, "/views");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("views"));

app.use(formidable());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.static("public", { extensions: ["html"] }));

app.get("./styles/main.css", function(req, res) {
  res.send("/styles/main.css");
  // res.end();
});

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
  // });

  // //lesson code
  // app.get("contact", (req, res) => {
  // res.json(fs.readFileSync(__dirname + "./data/posts.json", utf8));
  // });
  // app.post("contact", (req, res) => {
  const pathPostsFile = __dirname + "./data/posts.json";
  const allposts = JSON.parse(fs.readFileSync(pathPostsFile).toString());

  const post = req.fields;
  allposts.push(post);
  fs.writeFileSync(pathPostsFile, JSON.stringify(allposts));
  res.json(fs.readFileSync(pathPostsFile, "utf8"));
  res.end(data);
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
