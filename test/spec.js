/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */

'use strict';

const expect = require('chai').expect;
const path = require('path');
const testCases = require(path.resolve(__dirname, 'cases'));
const app = require(path.resolve(__dirname, '..', 'index'));

describe('parseLine (Array(String)) -> Array(String)', function () {
  testCases[1].forEach(test => {
    it(`Returns a 9-element array of 9-character strings for ${test.expectation}`,
       function () {
         const digits = app.parseLine(test.line);
         expect(digits.length).to.equal(9);

         digits.forEach(digit => expect(digit.length).to.equal(9));
       });
  });
});

describe('[Private] _mapCharacter(Array(String), String) -> Array(String, Number)',
         () => {
           // Since we use the test cases to build our character map, this test is mostly
           // about validating the test cases. We skip the 10th case (123456789), as it
           // is unnecessary.
           testCases[1].forEach((test, i) => {
             if (i > 9) return;

             it(`Maps first digit of "${test.expectation}" to ${i}`,
                function () {
                  const kvPair = app.mapCharacter(test.line, test.expectation[0]);
                  expect(kvPair[1]).to.equal(i);
                });
           });
         });

describe('accountNumberFromLine (Array(String)) -> String', function () {
  testCases[1].forEach(test => {
    it(`Can parse account #${test.expectation}`, function () {
      expect(app.accountNumberFromLine(test.line)).to.equal(test.expectation);
    });
  });
});
