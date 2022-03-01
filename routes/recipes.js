const express = require("express");
const router = express.Router();
const fs = require("fs");
const dataPath = './data/data.json';

router.get("/", (req, res) => {
    const recipeNames = [];
    fs.readFile(dataPath, (err, data) => {
        JSON.parse(data).recipes.forEach((recipe) => {
            recipeNames.push(recipe.name);
        });
        res.status(200).json({
            "recipeNames": recipeNames
        });
    });
});

module.exports = router;