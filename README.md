# process-yargs-parser

> Lightweight Node.js Arguments Parser with 0 Dependencies 🚀 and many yargs-parser configurations disabled by default.

<p>
  <a href="https://www.npmjs.com/package/process-yargs-parser">
    <img src="https://img.shields.io/npm/v/process-yargs-parser.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/process-yargs-parser">
    <img src="https://img.shields.io/npm/dm/process-yargs-parser.svg" alt="npm downloads" />
  </a>
  <a href="https://packagephobia.now.sh/result?p=process-yargs-parser" rel="nofollow">
    <img src="https://packagephobia.now.sh/badge?p=process-yargs-parser" alt="Install Size">
  </a>
  <a href="https://github.com/legend80s/process-yargs-parser/blob/master/test/index.test.js">
    <img src="https://badgen.net/badge/passed/jest/green" alt="jest" />
  </a>
</p>

## Usage

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

## Feature

- [x] duplicate-arguments-array: default false
- [x] boolean-negation: default false
- [x] boolean-negation: default false
