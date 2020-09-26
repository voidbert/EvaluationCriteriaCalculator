# Custom subjects

The website was made so that subjects can be edited easily. Not only that, you can add your own
ones.

# Creating and deleting subjects

All the files containing the subjects are in the `subjects/list` directory (counting from the root
of the repository). To create a subject,

- Create a file with the structure `[SUBJECT NAME].json` in the mentioned directory. The subject
name is what will appear in the dropdown menu for choosing a subject.

- Run the `subjects/lister.py` script with Python 3 with your working directory set as `subjects`.
This creates a JSON file with a list of all the subjects. This is needed because directory listing
support can't be enabled for GitHub pages and using a different JSON file for every subject allows
for a more maintainable website.

To delete a subject, find its correspondent file (`[SUBJECT NAME].json` in the `subjects/list`
directory) and delete it. After that, run the `subjects/lister.py` script as described in the
file creation process.

# Implementing a subject

A subject is a simple JavaScript object. It contains other objects, texts or text inputs, that will
be added to the page. The `Física e Química A.json` is a great example of everything described
below.

First, you should create the subject object. To do that, just put `{}` in the JSON file. Inside the
curly braces, texts and text inputs will be added.

## Text Objects

A text object will simply be displayed as a paragraph on the web page. To make it, create an
object inside the subject. Its key (name) should be the text that's going to be displayed and it
should have a property named `type` assigned as `"text"`:

```
{
	"Your text goes here" : {
		"type" : "text"
	}
}
```

## Text Inputs

A text input consists of a paragraph and a text input. The paragraph's text will be the object's
name followed by a colon. This will appear before the text input to indicate what it refers to, for
example, the first test. To create an element like this, the object should have a property named
`type` set as `"textbox"`.

```
{
	"Your text goes here" : {
		"type" : "textbox"
	}
}
```

That is not enough for a valid text input, though. A multiplier first needs to be set. All numbers
that get inputted in all text boxes will be multiplied by a value (each number by its own) and then
summed to create the final grade. For example, if a test is worth 30% of the final grade, its
`multiplier` property must be `0.3`.

The range of numbers that can be inputted in the text inputs defaults to from 0 to 200, the
prevalent system in Portugal. Nevertheless, you can use a custom range by setting the `range`
property as a list of two elements, the first being the lowest possible value an the second the
highest possible value.

	"range" : [0, 100] /*From 0 to 100 (including 0 and 100)*/

### A Note on Multipliers

Unless you have custom ranges, all multipliers should add up to 1. Only with custom ranges can they
add up to a different value. For example, if the final grade goes from 0 to 200 but a test that is
worth 20% and goes from 0 to 100, the multiplier of the test should be 0.4. 