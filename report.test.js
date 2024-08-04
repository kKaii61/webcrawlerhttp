const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages 2 pages', () => {
  const inputPages = {
    'https://wagslane.dev/path': 1,
    'https://wagslane.dev': 4,
  };

  const actual = sortPages(inputPages);
  const expected = [
    ['https://wagslane.dev', 4],
    ['https://wagslane.dev/path', 1],
  ];
  expect(actual).toEqual(expected);
});

test('sortPages 2 pages', () => {
  const inputPages = {
    'https://wagslane.dev/path1': 1,
    'https://wagslane.dev/path2': 10,
    'https://wagslane.dev/path3': 12,
    'https://wagslane.dev/path4': 5,
    'https://wagslane.dev': 4,
  };

  const actual = sortPages(inputPages);
  const expected = [
    ['https://wagslane.dev/path3', 12],
    ['https://wagslane.dev/path2', 10],
    ['https://wagslane.dev/path4', 5],
    ['https://wagslane.dev', 4],
    ['https://wagslane.dev/path1', 1],
  ];
  expect(actual).toEqual(expected);
});
