import json
str = {
	"details":
		{
			"ingredients": [
				"500mL water",
				"100g spaghetti",
				"25mL olive oil",
				"4 cloves garlic",
				"Salt"
			],
			"numSteps":5
		}
}
str = json.dumps(str)

str1 = {
    "details": {
        "ingredients": [
            "500mL water",
            "100g spaghetti",
            "25mL olive oil",
            "4 cloves garlic",
            "Salt"
        ]
    },
    "numSteps": 5
}

str1 = json.dumps(str1)

print(str == str1)