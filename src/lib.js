/**
 * @param {string} str
 *
 * @example
 * camelCase('for-bar')
 * // => fooBar
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
exports.camelCase = (str) => {
  if (!str || !/[^a-zA-Z0-9]/.test(str)) {
    return str;
  }

  const words = str
    .toLowerCase()
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
  ;

  const rest = words.slice(1).reduce((acc, word) => {
    return acc + word[0].toUpperCase() + word.slice(1);
  }, '');

  return words[0] + rest;
}
