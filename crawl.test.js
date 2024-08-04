const { normalizeUrl, getUrlFromHtml } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('getUrlFromHtml absolute', () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://blog.boot.dev/">Visit blog.boot.dev</a>
    </body>
  </html>
`;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/'];
  expect(actual).toEqual(expected);
});

test('getUrlFromHtml relative', () => {
  const inputHTMLBody = `
    <html>
      <body>
          <a href="/path/">Visit blog.boot.dev</a>
      </body>
    </html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getUrlFromHtml both', () => {
  const inputHTMLBody = `
    <html>
      <body>
          <a href="https://blog.boot.dev/path1/">Blog Path One</a>
          <a href="/path2/">Blog Path Two</a>
      </body>
    </html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = [
    'https://blog.boot.dev/path1/',
    'https://blog.boot.dev/path2/',
  ];
  expect(actual).toEqual(expected);
});

test('getUrlFromHtml invalid', () => {
  const inputHTMLBody = `
    <html>
      <body>
          <a href="invalid">Blog Path One</a>
      </body>
    </html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getUrlFromHtml(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});

// test('normalizeURL strip protocol', () => {
//   const input = 'https://blog.boot.dev/path';
//   const actual = normalizeUrl(input);
//   const expected = 'blog.boot.dev/path';
//   expect(actual).toEqual(expected);
// });

// test('normalizeURL strip end slash', () => {
//   const input = 'https://blog.boot.dev/path/';
//   const actual = normalizeUrl(input);
//   const expected = 'blog.boot.dev/path';
//   expect(actual).toEqual(expected);
// });

// test('normalizeURL Capitals', () => {
//   const input = 'https://BLOG.boot.dev/path/';
//   const actual = normalizeUrl(input);
//   const expected = 'blog.boot.dev/path';
//   expect(actual).toEqual(expected);
// });

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
