//This script calculates the final grade from the user input and places it in the web page.

//This keeps track of the value of every input.
var criteria = {};

//This function gets called whenever one of the inputs is updated.
function onInputUpdate(id, range, multiplier) {
	//Update the text of the text box updated.
	var text = document.getElementById(id).value;

	//Convert the value to a number. First, convert commas to periods (decimals in Portuguese are
	//achieved with commas and I would like both commas and dots to work as a decimal separator).
	text = text.replace(",", ".");
	var number = Number(text);
	
	//Store the value in the global dictionary and its multiplier.
	criteria[id] = [number, multiplier];

	//If any of the input values is invalid (NaN) or not inside the range where it should be, place
	//a message in the webpage.
	var hasInvalid = false;
	var values = Object.values(criteria);
	for (var i = 0; i < values.length; i++) {
		if (isNaN(values[i][0])) {
			hasInvalid = true;
			break;
		}
		else if (!(range[0] <= values[i][0] && values[i][0] <= range[1])) {
			hasInvalid = true;
			break;
		}
	}

	if (hasInvalid) {
		document.getElementById("nan-error").style.display = "block";
		//Hide the final grade.
		document.getElementById("final-grade").style.display = "none";
	}
	else {
		//There aren't invalid values. Don't show the error.
		document.getElementById("nan-error").style.display = "none";
		//Show the final grade.
		document.getElementById("final-grade").style.display = "block";

		//Calculate the final grade and show it to the user. Fix the decimal places and present both
		//"pontos" and "valores"
		var final = 0;
		var keys = Object.keys(criteria);
		for (var i = 0; i < keys.length; i++) {
			final += criteria[keys[i]][0] * criteria[keys[i]][1];
		}
		document.getElementById("final-grade").textContent = final.toFixed(1) + " pontos, " +
			Math.round(final / 10) + " valor(es)";
	}
}