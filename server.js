const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs"); // ejs for viewer
app.set("view", __dirname + "/views"); //all the file are coming from that to be viewed
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () =>
  console.log("Server's Listening...!")
);
