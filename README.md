# process-yargs-parser

> Lightweight Node.js arguments parser with 0 Dependencies 🚀.
>
> **process-yargs-parser** is an opinionated yargs-parser with many needless yargs-parser configurations disabled by default.

<p>
  <a href="https://www.npmjs.com/package/process-yargs-parser">
    <img src="https://img.shields.io/npm/v/process-yargs-parser.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/process-yargs-parser">
    <img src="https://img.shields.io/npm/dm/process-yargs-parser.svg" alt="npm downloads" />
  </a>
  <a href="https://packagephobia.now.sh/result?p=process-yargs-parser" rel="nofollow">
    <img src="https://packagephobia.now.sh/badge?p=process-yargs-parser" alt="install size">
  </a>
  <a href="https://github.com/legend80s/process-yargs-parser/blob/master/test/index.test.js">
    <img src="https://badgen.net/badge/passed/jest/green" alt="jest passed" />
  </a>
  <a href="https://github.com/legend80s/process-yargs-parser/blob/master/test/index.test.js">
    <img src="http://img.shields.io/nycrc/legend80s/process-yargs-parser" alt="min coverage" />
  </a>
  <a href="https://www.npmjs.com/package/git-commit-msg-linter">
    <img src="https://badgen.net/badge/git-commit-msg-linter/3.0.0/yellow" alt="commit msg linted by git-commit-msg-linter" />
  </a>
</p>

## Example

```sh
npm i process-yargs-parser --save
```

```javascript
const argv = require('process-yargs-parser')(process.argv.slice(2))

console.log(argv)
```

```sh
node ./example.js --foo=33 --bar hello

{ _: [], foo: 33, bar: 'hello' }
```

*or parse a string!*

```javascript
const argv = require('process-yargs-parser')('--foo=99 --bar=33')

console.log(argv)
```

```javascript
{ _: [], foo: 99, bar: 33 }
```

READ more usages in [index.test.js](https://github.com/legend80s/process-yargs-parser/blob/master/test/index.test.js).

## Features

- [x] duplicate-arguments-array: default false
- [x] short-option-groups: default false
- [x] boolean-negation: default false
- [x] no-convert-number-string default false. will convert "1" to 1
