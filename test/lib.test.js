const { camelCase } = require('../src/lib');

describe('lib', () => {
  describe('camelCase', () => {
    it('fooBar to fooBar', () => {
      const input = 'fooBar';
      const actual = camelCase(input);
      const expected = 'fooBar';

      expect(actual).toEqual(expected);
    });

    it('Foo Bar to fooBar', () => {
      const input = 'Foo Bar';
      const actual = camelCase(input);
      const expected = 'fooBar';

      expect(actual).toEqual(expected);
    });

    it('--foo-bar-- to fooBar', () => {
      const input = '--foo-bar--';
      const actual = camelCase(input);
      const expected = 'fooBar';

      expect(actual).toEqual(expected);
    });

    it('__FOO_BAR__ to fooBar', () => {
      const input = '__FOO_BAR__';
      const actual = camelCase(input);
      const expected = 'fooBar';

      expect(actual).toEqual(expected);
    });
  });
});
