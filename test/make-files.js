'use strict';

// This file is used to generate test files for cli operation. Pass
// the generated =inputs.txt= file as input to the =kataocr= module
// on the comand line and generate an output file. Diffing that output
// with the generated =expects.txt= file should show no difference.

const fs = require('fs');
const inputs = fs.createWriteStream('inputs.txt', {encoding: 'utf8'});
const expects = fs.createWriteStream('expects.txt', {encoding: 'utf8'});

const cases = require('./cases');
for (const c in cases) {
  const cc = cases[c];

  cc.forEach(entry => {
    inputs.write(`${entry.line.join('\n')}\n`);
    expects.write(`${entry.expectation}\n`);
  });
}
