const fs = require('fs');
const path = require('path');

const input_file_path = path.join(process.cwd(), 'input.txt');
const output_file_path = path.join(process.cwd(), 'output.txt');

fs.readFile(input_file_path, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }

  const modified_data = data.toUpperCase();

  fs.writeFile(output_file_path, modified_data, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
      return;
    }
    console.log(`File has been modified and saved to ${output_file_path}`);
  });
});

