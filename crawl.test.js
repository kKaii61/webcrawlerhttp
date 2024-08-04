const normalizeUrl = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeURL empty', () => {
  const input = '';
  const actual = normalizeUrl(input);
  const expected = '';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeUrl(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip end slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeUrl(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL Capitals', () => {
  const input = 'https://BLOG.boot.dev/path/';
  const actual = normalizeUrl(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

// test('normalizeURL strip double end slash', () => {
//   const input = 'https://blog.boot.dev/path//';
//   const actual = normalizeUrl(input);
//   const expected = 'blog.boot.dev/path';
//   expect(actual).toEqual(expected);
// });

// test('normalizeURL strip quadrup end slash', () => {
//   const input = 'https://blog.boot.dev/path////';
//   const actual = normalizeUrl(input);
//   const expected = 'blog.boot.dev/path';
//   expect(actual).toEqual(expected);
// });

// test('normalizeURL strip query parameter', () => {
//   const input = 'https://blog.boot.dev/path?q=ahahahah';
//   const actual = normalizeUrl(input);
//   const expected = 'blog.boot.dev/path';
//   expect(actual).toEqual(expected);
// });
