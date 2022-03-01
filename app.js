const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const recipes = require("./routes/recipes.js");
app.use("/recipes", recipes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
