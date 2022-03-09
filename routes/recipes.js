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
        }, null, 3);
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
            if(requiredRecipe[0].hasOwnProperty("instructions")){
                res.status(200).json({
                    "details": {
                        "ingredients": requiredRecipe[0].ingredients
                    },
                    "numSteps": requiredRecipe[0].instructions.length
                });
            } else{
                res.status(200).json({
                    "details": {
                        "ingredients": requiredRecipe[0].ingredients
                    },
                    "numSteps": "No steps found"
                });
            }

        }
    });
});

router.post("/", (req, res) => {
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const newRecipe = {
        "name": name,
        "ingredients": ingredients,
        "instructions": instructions
    };
    fs.readFile(dataPath, (err, data) => {
        const requiredRecipe = JSON.parse(data).recipes.filter((recipe) => {
            return recipe.name === name;
        });
        if(requiredRecipe.length === 0){
            const oldData = JSON.parse(data);
            oldData.recipes.push(newRecipe);
            const newData = JSON.stringify(oldData);
            fs.writeFile(dataPath, newData, "utf8",(err) => {
                if(!err){
                    res.status(201).json(null);
                }
            });
        } else if(requiredRecipe.length != 0){
            res.status(400).json({
                "error": "Recipe already exists"
            });
        }
    });
});

router.put("/", (req, res) => {
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const recipeToBeUpdated = {
        "name": name,
        "ingredients": ingredients,
        "instructions": instructions
    };
    fs.readFile(dataPath, (err, data) => {
        const jsonData = JSON.parse(data);
        const requiredRecipe = jsonData.recipes.filter((recipe) => {
            return recipe.name === name;
        });
        if(requiredRecipe.length === 0){
            res.status(404).json({
                "error": "Recipe does not exist"
            });
        } else{
            const recipeIndex = jsonData.recipes.findIndex((recipe) => {
                return recipe.name === name
            });
            if(recipeIndex > -1){
                jsonData.recipes.splice(recipeIndex, 1);
                jsonData.recipes.push(recipeToBeUpdated);
                const newData = JSON.stringify(jsonData);
                fs.writeFile(dataPath, newData, "utf8",(err) => {
                    if(!err){
                        res.status(201).json(null);
                    }
                });
            }
        }
    });
});

router.delete("/:recipeName", (req, res) => {
    const name = req.params.recipeName;
    fs.readFile(dataPath, (err, data) => {
        const jsonData = JSON.parse(data);
        const requiredRecipe = jsonData.recipes.filter((recipe) => {
            return recipe.name === name;
        });
        if(requiredRecipe.length === 0){
            res.status(404).json({
                "error": "Recipe does not exist"
            });
        } else{
            const recipeIndex = jsonData.recipes.findIndex((recipe) => {
                return recipe.name === name
            });
            if(recipeIndex > -1){
                jsonData.recipes.splice(recipeIndex, 1);
                const newData = JSON.stringify(jsonData);
                fs.writeFile(dataPath, newData, "utf8",(err) => {
                    if(!err){
                        res.status(200).json({
                            "message": "Recipe deleted successfully"
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;