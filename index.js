'use strict';

const path = require('path');
const assert = require('assert');
const testCases = require(path.resolve(__dirname, 'test', 'cases'));

// ------------------------------------------------------------
// --                    Data Structures                     --
// ------------------------------------------------------------
//
// Input into this system is a single account number, represented as
// 3 lines of text, each being 27 characters long, i.e., a 3x27 matrix.
// Each 3x3 portion of the matrix composes a single character of the
// 9-digit account number.
//
// Each of these 3x3 matrices is then linearized into a simple 9-character
// string. Our =characterMap= maps all the valid linearized digits to
// their respective numbers. This character map is built directly from
// our given test cases.
const characterMap = {};
const case1 = testCases[1];
const digits = case1.slice(0, 10);

// mapCharacter :: (Array(String), String) -> Array(String, Number)
//
// Private function used only for building internal character map.
function mapCharacter (line, digit) {
  const accountNumber = parseLine(line);
  const vector = accountNumber[0];

  return [vector, ~~digit];
}

// Build =characterMap=
digits.map(instance => instance.line)
  .map(mapCharacter)
  .forEach(keyValue => {
    characterMap[keyValue[0]] = keyValue[1];
  });


// parseLine :: (Array(String)) -> Array(String)
//
// Input array is a 3-element array, with each element being the
// 27-character string for each line read from the input file.
//
// Output array is a nine-element array of nine-character strings,
// which are just linear representations of each digit.
function parseLine (lines) {
  var accountNumber = [];

  assert(lines.length === 3, 'need 3 lines for an account');
  lines.forEach(line => assert(line.length === 27, 'line length'));

  for(var i = 0; i < lines[0].length; i += 3) {
    var character = '';

    lines.forEach(line => {
      character += line.substr(i, 3);
    });

    accountNumber.push(character);
  }

  return accountNumber;
}


// ------------------------------------------------------------
// --                      Public API                        --
// ------------------------------------------------------------

// accountNumberFromLine :: (Array(String)) -> String
//
// Input array is a 3-element array, with each element being the
// 27-character string for each line read from the input file.
//
// Output string is a 9-digit numeric account number.
function accountNumberFromLine (line) {
  return parseLine(line)
    .map(vector => characterMap[vector])
    .reduce((accountString, digit) => {
      accountString += digit;
      return accountString;
    }, '');
}

module.exports.parseLine = parseLine;
module.exports.accountNumberFromLine = accountNumberFromLine;
module.exports.mapCharacter = mapCharacter;
