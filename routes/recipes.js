const { json } = require("body-parser");
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

router.get("/details/:recipeName", (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        const requiredRecipe = JSON.parse(data).recipes.filter((recipe) => {
            return recipe.name === req.params.recipeName;
        });
        if(requiredRecipe.length == 0){
            res.status(200).json({});
        } else{
            res.status(200).json({
                "details": {
                    "ingredients": requiredRecipe[0].ingredients
                },
                "numSteps": requiredRecipe[0].instructions.length
            });
        }
    });
});


module.exports = router;