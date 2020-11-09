const parse = require('../');

describe('yargs-parser', () => {
  it('Should parse as yargs-parser when use `=` as separator', () => {
    const argv = '-x=2 -x=3 https://s.gravatar.com/avatar/438e8984d73c7da54916acb86fb5fb7c?size=100&default=retro -y=4 -n=5 -abc --beep=boop foo bar baz'.split(' ');

    const expected = {
      x: 3,
      y: 4,
      n: 5,
      a: true,
      b: true,
      c: true,
      beep: 'boop',

      _: [
        'foo',
        'bar',
        'baz',
        'https://s.gravatar.com/avatar/438e8984d73c7da54916acb86fb5fb7c?size=100&default=retro',
      ]
    };

    const actual = parse(argv, { "short-option-groups": true });

    const { _: restExpected, ...othersExpected } = expected;
    const { _: restActual, ...othersActual } = actual;

    expect(restActual.sort()).toEqual(restExpected.sort());
    expect(othersActual).toEqual(othersExpected);
  });

  it('Should parse as yargs-parser when use `space` as separator', () => {
    const input = ['-x=1', '-y', 2, '--foo=3', '----foo=4', '-uvw=31', '--bar', 4, 'p=5', '--q=-x', '-----k=-x', '-z', '--two', '--baz====1'];
    const actual = parse(input, { "duplicate-arguments-array": true, 'short-option-groups': true });
    const expected = {
      x: 1,
      y: 2,
      foo: [3, 4],
      '--foo': 4,
      u: true,
      v: true,
      w: 31,
      bar: 4,
      q: '-x',

      '---k': '-x',
      k: '-x',
      z: true,
      two: true,
      baz: '===1',

      _: ['p=5'],
    };

    // console.log('actual:', actual);

    expect(actual).toEqual(expected);
  });

  it('Should parse a string!', () => {
    const argv = '--foo=99 --bar=33';

    const expected = {
      foo: 99,
      bar: 33,

      _: [],
    };

    const actual = parse(argv);

    expect(actual).toEqual(expected);
  });

  it('Should arguments after `--` be collected into positional args', () => {
    const argv = 'hello -x 1 -x 2 world -- --for --bar=baz -a'.split(' ');

    const expected = {
      x: 2,
      _: [
        'hello',
        'world',

        '--for',
        '--bar=baz',
        '-a',
      ],
    };

    const actual = parse(argv);

    // console.log('actual:', actual);

    const { _: restActual, ...othersActual } = actual;
    const { _: restExpected, ...othersExpected } = expected;

    expect(othersActual).toEqual(othersExpected);
    expect(restActual.sort()).toEqual(restExpected.sort());

    expect(actual).toEqual(expected);
  });

  it('Should word with one beginning hyphen parsed into "booleans" when `short-option-groups` enabled', () => {
    const argv = '-hello --world -name=legend -age 80 -xy'.split(' ');

    const expected = {
      h: true,
      l: [true, true],
      o: true,

      world: true,

      n: true,
      m: true,
      a: [true, true],
      e: [true, 'legend', 80],

      g: true,

      x: true,
      y: true,

      _: [],
    };

    const actual = parse(argv, {
      'duplicate-arguments-array': true,
      'short-option-groups': true,
    });

    expect(actual).toEqual(expected);
  });

  it('Should arguments with one beginning hyphen parsed into "a boolean" when `short-option-groups` disabled', () => {
    const argv = '-hello --world -name=legend -age 80 -xy'.split(' ');

    const expected = {
      hello: true,
      world: true,
      name: 'legend',
      age: 80,
      xy: true,
      _: [],
    };

    const actual = parse(argv, { 'short-option-groups': false });

    expect(actual).toEqual(expected);
  });

  it('Should arguments startsWith `--no` be negated', () => {
    const argv = '--no-implicit-any --no-implicit-this false --no-pick=true --no-topping yes --no-emit'.split(' ');

    const expected = {
      'no-implicit-any': true,
      'implicit-any': false,
      'no-emit': true,
      'emit': false,

      'no-implicit-this': 'false',
      'no-pick': 'true',
      'no-topping': 'yes',

      _: [],
    };

    const actual = parse(argv, { 'boolean-negation': true });

    // console.log('actual:', actual);

    expect(actual).toEqual(expected);
  });

  it('Should arguments startsWith `--no` won\'t be negated when boolean-negation disabled', () => {
    const argv = '--no-implicit-any --no-implicit-this false --no-pick=true --no-topping yes --no-emit'.split(' ');

    const expected = {
      'no-implicit-any': true,
      'no-emit': true,

      'no-implicit-this': 'false',
      'no-pick': 'true',
      'no-topping': 'yes',

      _: [],
    };

    const actual = parse(argv, { 'boolean-negation': false });

    // console.log('actual:', actual);

    expect(actual).toEqual(expected);
  });

  it('Should arguments be coerced into an array when duplicated', () => {
    const argv = '-x=1 -x=2'.split(' ');

    const expected = {
      x: [1, 2],
      _: [],
    };

    const actual = parse(argv, { "duplicate-arguments-array": true });

    expect(actual).toEqual(expected);
  });

  it('Should group the duplicate key with redundant hyphens', () => {
    const input = ['--foo=3', '--foo=3', '---foo=4', '---foo=4', '----foo=5', '----foo=5', '-----foo=6'];
    const actual = parse(input, { "duplicate-arguments-array": true });
    const expected = {
      foo: [3, 3, 4, 4, 5, 5, 6],
      '-foo': [4, 4],
      '--foo': [5, 5],
      '---foo': 6,

      _: [],
    };

    // console.log('actual:', actual);

    expect(actual).toEqual(expected);
  });

  it('Should parse multiple beginning hyphens into two entry', () => {
    const input = ['-----k=-x'];
    const actual = parse(input, { "duplicate-arguments-array": true });
    const expected = {
      '---k': '-x',
      k: '-x',

      _: [],
    };

    // console.log('actual:', actual);

    expect(actual).toEqual(expected);
  });

  it('Should parse the ending flag as boolean', () => {
    const input = ['--debug'];
    const actual = parse(input, { "duplicate-arguments-array": true });
    const expected = {
      debug: true,

      _: [],
    };

    // console.log('actual:', actual);

    expect(actual).toEqual(expected);
  });

  it('Should parse a empty string', () => {
    const argv = '';

    const expected = {
      _: [],
    };

    const actual = parse(argv);

    expect(actual).toEqual(expected);
  });

  it('Should parse a blank string with multiple spaces', () => {
    const argv = '     ';

    const expected = {
      _: [],
    };

    const actual = parse(argv);

    expect(actual).toEqual(expected);
  });

  it('Should parse undefined as input', () => {
    const argv = undefined;

    const expected = {
      _: [],
    };

    const actual = parse(argv);

    expect(actual).toEqual(expected);
  });
});
