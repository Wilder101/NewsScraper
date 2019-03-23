const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Express setup
const app = express();
const PORT = process.env.PORT || 8080;

// Express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database setup
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));

// Start server
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});