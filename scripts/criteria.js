//This scripts handles subject changes, by erasing the old HTML elements and placing the ones of the
//new subject. This is done analyzing the parsed JSON subject file.

//Deletes the HTML elements of the previous subject.
function clearPreviousSubject() {
	//Delete all children of the criteria container.
	var container = document.getElementById("subject-container");
	container.textContent = "";
}

//Adds a text element to the page.
function addText(text) {
	//Create a div for the text and add it to the page.
	var div = document.createElement("div");
	div.className = "criteria";
	div.textContent = text;
	document.getElementById("subject-container").appendChild(div);
}

//Adds an input element to the page.
function addTextbox(text, range, multiplier) {
	//Create a div to contain both the text and the input.
	var container = document.createElement("div");
	container.className = "criteria";

	//Place the text.
	container.textContent = text + ":";

	//Add a line break between the text and the textbox.
	container.appendChild(document.createElement("br"));

	//Create the textbox (input element).
	var input = document.createElement("input");
	input.id = text; //Set an ID so that the element's text can be accessed
	input.inputMode = "numeric"; //Bring up the number keypad on mobile.
	input.onchange = function() {
		onInputUpdate(text, range, multiplier);
	}; //Calculate the grade when there's a change to the text.
	container.appendChild(input);

	//Add the container to the web page.
	document.getElementById("subject-container").appendChild(container);
}

//Creates the HTML elements for a subject and adds them to the page.
function placeNewSubject(subject) {
	//Create the right element(s) for every key of the object.
	var keys = Object.keys(subject);
	for (var i = 0; i < keys.length; i++) {
		//Add different elements depending on the type of the object.
		if (subject[keys[i]].type == "text")
			addText(keys[i]);
		else if (subject[keys[i]].type == "textbox")
		{
			//Try to get the range of the grade values. If it's not found, use 0 to 200, the
			//standard portuguese secondary education grade system.
			var range = subject[keys[i]].range || [0, 200];
			addTextbox(keys[i], range, subject[keys[i]].multiplier);
		}	
	}
}