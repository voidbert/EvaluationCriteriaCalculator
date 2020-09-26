//This script is responsible for handling window resizes, adjusting the size of the fonts when the
//window gets resized.

//Create a canvas to allow for text measuring.
var ctx = document.createElement("canvas").getContext("2d");

//Calculates the maximum font size in integer pxs for a text, given a maximum possible width.
function calculateMaximumFontSize(text, font, maxWidth) {
	//Start increasing the font size until the text surpasses the maximum width.
	var fontSize = 0;
	var width = 0;
	while (width < maxWidth) {
		fontSize++;
		ctx.font = fontSize + "px " + font;
		width = ctx.measureText(text).width;
	}

	return fontSize;
}

function updateFontSizes() {
	//Get the maximum width of the title. This is the full width of the window on portrait
	//orientation and half of it on landscape.
	var maxWidth = window.innerWidth;
	if (window.innerWidth > innerHeight)
		maxWidth = window.innerWidth / 2;
	//Add some margin to the maximum width.
	maxWidth -= 20;
	//Calculate and set the font size of the title.
	document.getElementById("title").style.fontSize = calculateMaximumFontSize(
		"Critérios de avaliação", "sans", maxWidth) + "px";

	//Do the same with the final grade text. If can take 50% of the width in landscape mode and 25%
	//in portrait mode.
	var maxWidth = window.innerWidth * 0.6;
	if (window.innerWidth > innerHeight)
		maxWidth = window.innerWidth * 0.3;
	//Calculate and set the font size of the title.
	document.getElementById("final-grade-title").style.fontSize = calculateMaximumFontSize(
		"Nota final", "sans", maxWidth) + "px";
}

//When the window gets resized, update the font size.
window.addEventListener("resize", updateFontSizes);

//Because when the window is initialized, the resize event isn't triggered, set the size of the
//fonts
updateFontSizes();