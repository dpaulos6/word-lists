/* 

  This script allows you to easily convert a text file into a JSON file, and will delete the input text file after the conversion. The script also sorts the words alphabetically.
  Warning: This script works for word lists with one word per line or multiple words per line separated by spaces.
  
  To run this, simply open terminal and run the following command: node index.js /path/to/input.txt /path/to/output.json.
  If you do not specify the output file path, the script will create a JSON file with the same name as the input file in the same directory.

*/

const fs = require("fs");
const path = require("path");

function textFileToJson(inputFilePath, outputFilePath) {
  try {
    const text = fs.readFileSync(inputFilePath, "utf8");
    const lines = text.split("\n");
    const words = [];
    lines.forEach((line) => {
      line.split(" ").forEach((word) => {
        const trimmedWord = word.trim().toLowerCase();
        if (trimmedWord) {
          words.push(trimmedWord);
        }
      });
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

if (process.argv.length < 3 || process.argv.length > 4) {
  console.error("Usage: node index.js <inputFilePath> [outputFilePath]");
  process.exit(1);
}

const inputFilePath = process.argv[2];
const outputFilePath =
  process.argv[3] ||
  path.join(
    path.dirname(inputFilePath),
    path.basename(inputFilePath, path.extname(inputFilePath)) + ".json"
  );

textFileToJson(inputFilePath, outputFilePath);
