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
