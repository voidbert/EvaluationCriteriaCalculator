//This script interacts with the server, downloading the list of subjects that will be placed in the
//select element, downloading the criteria of every subject and saving downloaded subjects, so that
//a file is never downloaded twice.

//This function gets the list of subjects and adds them to the select element.
function placeSubjects() {
	//Get the file with the directory listing (know why this done in the subjects/lister.py file).
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		//Check if the request is ready.
		if (request.readyState == 4) {
			//It is. Check if the request was successful.
			if (request.status == 200) {
				//It was. Parse the list of subjects.
				var subjects = JSON.parse(request.responseText);
				//For every subject, add a option to the select.
				var select = document.getElementById("choice");
				for (var i = 0; i < subjects.length; i++) {
					var option = document.createElement("option");
					option.textContent = subjects[i];
					select.appendChild(option);
				}
			}
			else {
				//It wasn't. Warn the user.
				alert("Erro ao carregar a lista de disciplinas. Este site não será funcional.");
			}
		}
	};
	request.open("GET", "subjects/listing.json", true);
	request.send();
}

//This stores the previously downloaded subjects.
var subjects = {};

//Keep track of the last chosen subject (to revert to it in case loading the new one fails)
var lastSubjectIndex = 0;

//This function gets called when an subject is chosen.
function onSubjectChosen() {
	//Get the chosen subject.
	var select = document.getElementById("choice");
	var chosen = select.options[select.selectedIndex].textContent;

	//Get the object of the subject. If it was already downloaded, use it.
	if (chosen in subjects) {
		//Remove the last subject and place the newest one.
		clearPreviousSubject();
		placeNewSubject(subjects[chosen]);

		//Update the last selected index. Make sure that the text that shows that a grade can only
		//be calculated before a subject is chosen isn't visible.
		lastSubjectIndex = select.selectedIndex;
		document.getElementById("choose-first").style.display = "none";
		return;
	}

	//The subject wasn't downloaded. Do it.
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		//Check if the request is ready.
		if (request.readyState == 4) {
			//It is. Check if the request was successful.
			if (request.status == 200) {
				//It was. Parse the subject and store it.
				subjects[chosen] = JSON.parse(request.responseText);

				//Remove the last subject and place the newest one.
				clearPreviousSubject();
				placeNewSubject(subjects[chosen]);

				//Update the last selected index. Make sure that the text that shows that a grade
				//can only be calculated before a subject is chosen isn't visible.
				lastSubjectIndex = select.selectedIndex;
				document.getElementById("choose-first").style.display = "none";
			}
			else {
				//It wasn't. Warn the user and revert to the last subject chosen. 
				alert("Erro ao carregar a disciplina.");
				select.selectedIndex = lastSubjectIndex;
			}
		}
	};
	request.open("GET", "subjects/list/" + chosen + ".json");
	request.send();
}

//Get the list of subjects when the page starts.
placeSubjects();