#! /usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const argv = require('yargs').argv;
const split = require('split2');
const app = require(path.resolve(__dirname, '..', 'index'));

// ------------------------------------------------------------
// --                   Input Validation                     --
// ------------------------------------------------------------
const inputFile = argv.in || argv.i;
const outputFile = argv.out || argv.o || process.stdout;

if (!inputFile || !fs.existsSync(path.resolve(process.cwd(), inputFile))) {
  console.error(`\
    usage: kataocr <options>
    
    Options:
    
    -i --in: Path to input file (required)
    -o --out: Path to output file (Defaults to stdout)
`);
  process.exit(1);
}

// ------------------------------------------------------------
// --                 Resource Marshalling                   --
// ------------------------------------------------------------
const inputStream = fs.createReadStream(path.resolve(process.cwd(), inputFile), {
  encoding: 'utf8',
  flags: 'r+'
});
const outputStream = (outputFile === process.stdout)
      ? process.stdout
      : fs.createWriteStream(path.resolve(process.cwd(), outputFile), {
        encoding: 'utf8',
        flags: 'w+'
      });


// ------------------------------------------------------------
// --                       Operation                        --
// ------------------------------------------------------------
var account = [];
var seen = 0;

inputStream.pipe(split())
  .on('data', line => {
    if (seen > 2) {
      const acct = app.accountNumberFromLine(account);
      const output = app.validateAccount(acct);
      outputStream.write(`${output}\n`);
      account = [];
      seen = 0;
    }
    account.push(line);
    seen++;
  })
  .on('end', function () {
    // This handler is really just an edge case, where an input
    // file does not have an empty line before EOF.
    if (seen > 2) {
      const acct = app.accountNumberFromLine(account);
      const output = app.validateAccount(acct);
      outputStream.write(`${output}\n`);
      account = [];
      seen = 0;
    }
  });
