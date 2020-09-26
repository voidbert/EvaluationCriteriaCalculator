#This file creates a list of all the subjects (JSON files) stored in the list directory. This is
#done because this website is hosted on GitHub Pages and a page with PHP (or a .htaccess file) isn't
#possible, making this the best way to list directories.

from os import listdir, path
from os.path import splitext, isdir, join

#The entry point of the script.
def main():
	#Get the subject names (remove the .json extension) and put them in alphabetical order.
	subjects = [ splitext(p)[0] for p in listdir("list")]
	subjects.sort()
	
	#Convert the array to JSON.
	string = "["
	for subject in subjects:
		string += "\"" + subject + "\","
	#Remove the trailing comma and close the brackets
	if string.endswith(","):
		string = string[0 : len(string) - 1]
	string += "]"

	#Write the list of JSON files to a JSON file.
	stream = open("listing.json", "w")
	stream.write(string)
	stream.close()

#Go to the entry point if the script isn't being included.
if __name__ == "__main__":
	main()