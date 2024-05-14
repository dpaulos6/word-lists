/* 

  This script allows you to easily convert a text file into a JSON file, and will delete the input text file after the conversion. The script also sorts the words alphabetically.
  Warning: This script works for word lists with one word per line. This has not been tested with other types of files or multiple words per line.
  
  To run this, simply open terminal and run the following command: node index.js /path/to/input.txt /path/to/output.json.
  Please specify the paths correctly, if the file is inside the root folder of the script, do ./file.txt and ./file.json.

*/

const fs = require("fs");

function textFileToJson(inputFilePath, outputFilePath) {
  try {
    const text = fs.readFileSync(inputFilePath, "utf8");
    const lines = text.split("\n");
    const words = [];
    lines.forEach((line) => {
      const word = line.trim();
      if (word) {
        words.push(word);
      }
    });
    words.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
    fs.writeFileSync(outputFilePath, JSON.stringify(words, null, 2));
    console.log(`JSON file created successfully at ${outputFilePath}`);
    fs.unlinkSync(inputFilePath);
    console.log(`Input text file deleted successfully: ${inputFilePath}`);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

if (process.argv.length !== 4) {
  console.error("Usage: node index.js <inputFilePath> <outputFilePath>");
  process.exit(1);
}

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];
textFileToJson(inputFilePath, outputFilePath);
