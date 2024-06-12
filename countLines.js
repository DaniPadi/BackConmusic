const fs = require('fs');
const readline = require('readline');

const fileName = 'ruta/al/archivo.txt';

const readInterface = readline.createInterface({
  input: fs.createReadStream(fileName),
  output: process.stdout,
  console: false
});

let lineCount = 0;

readInterface.on('line', function(line) {
  lineCount++;
});

// Mostrar el número de líneas al finalizar la lectura del archivo
readInterface.on('close', function() {
  console.log(`El archivo tiene ${lineCount} líneas.`);
});
