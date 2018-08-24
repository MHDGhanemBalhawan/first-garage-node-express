const express = require("express");
const app = express();
const path = require("path");
const formidable = require("express-formidable");
const morgan = require("morgan");
const fs = require("fs");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
// const fs = require("fs");

var comments = require("./api/comments.js");

//import comments from "/data/comments.js";
console.log(comments);
app.get("/api/comments", function(req, res) {
  res.status(200).json({ comments });
});

app.use(express.static("public", { extensions: ["html"] }));
// import morgan from "morgan";

// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("tiny"));

app.use(bodyParser.json());

const publicPath = path.join(__dirname, "/views");
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "./views"));
app.use(express.static("views"));

app.use(formidable());

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.use(express.static("public", { extensions: ["html"] }));

app.get("./styles/main.css", function(req, res) {
  res.send("/styles/main.css");
  // res.end();
});

app.get("/comment", function(req, res) {
  res.render("comment");
});

app.get("/comments", function(req, res) {

  res.render("comments", {comments:comments}
);
});

app.get("/comments/:id", (req, res) => {
  // find the post in the `posts` array
  const comment = comments.filter( comment => {
    return comment.id == req.params.id;
  })[0];

  // render the `post.ejs` template with the post content
  res.render("comment", {
    id: comment.id,
    firstName: comment.firstName,
    lastName: comment.lastName,
    email: comment.email,
    telephone: comment.telephone,
    subject: comment.subject
  });
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

const pathPostsFile = __dirname + "/data/posts.json";
const allposts = JSON.parse(fs.readFileSync(pathPostsFile).toString());

// console.log(allposts);

app.get("/contact", function(req, res) {
  //  var contactPosts = allposts;
  res.render("contact", {
    // firstName: allposts.firstName,
    // lastName: allposts.lastName,
    // telephone: allposts.telephone,
    // email: allposts.email,
    // subject: allposts.subject
  });
  res.render("contact");
});

app.post("/contact/add", (req, res) => {
  //   console.log(req.fields);

  const post = req.fields;
  allposts.push(post);
  fs.writeFileSync(pathPostsFile, JSON.stringify(allposts));
  res.json(fs.readFileSync(pathPostsFile, "utf8"));
  res.end(data);
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
