# Bank OCR 
A Node implementation
of
[http://codingdojo.org/kata/BankOCR/](http://codingdojo.org/kata/BankOCR/)

## Installation
```shell
$ git clone ssh://git@github.com/lukealbao/kata-ocr
$ cd kata-ocr
$ npm install -g .
```

## Usage
Input text file is given by the equivalent `-i` or `--input`
options. The input file must accord with the specification in the
kata. Output will be written to path given by the equivalent `-o` or
`--output` options; if no output path is given, results will be
written to stdout.

```shell
$ kataocr -i accounts.txt -o validated-accounts.txt
```

## Testing
Implementation of data structures and checksum operation can be tested
with `npm test`.

## Todo

### User Story 4
Will need to refactor `accountNumberFromLine`, which will need to
output an array of possible numbers. This can probably be done by looping
through the linearized character vectors and replacing every
permutation of spaces with every permutation of bars or underscores. 

Once that is done, we will write a new procedure which calls
`validateAccount` on each of these possible numbers and outputs a line
according to the user story #4 spec.

### Refactoring
- Renaming index.js and procedures therein.
- Restyling functional-style mappings and reducings to more imperative
  loops, etc., according to other readers' preferences.
