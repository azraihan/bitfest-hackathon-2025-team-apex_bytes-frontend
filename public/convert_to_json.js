const fs = require('fs');
const readline = require('readline');

// Path to your input text file containing Bengali words
const inputFilePath = 'words.txt'; // Replace with the actual path of your text file
// Path to save the output JSON file
const outputFilePath = 'words.json';

// Create a readable stream
const readStream = fs.createReadStream(inputFilePath);

// Create an interface to read the file line by line
const rl = readline.createInterface({
  input: readStream,
  output: process.stdout,
  terminal: false
});

const words = [];

rl.on('line', (line) => {
  // Trim the line to remove any extra spaces and add the word to the array
  if (line.trim()) {
    words.push(line.trim());
  }
});

rl.on('close', () => {
  // Convert the array of words into a JSON object
  const wordsJson = JSON.stringify({ words: words }, null, 2);

  // Write the JSON object to the output file
  fs.writeFile(outputFilePath, wordsJson, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File has been saved as output.json');
    }
  });
});
