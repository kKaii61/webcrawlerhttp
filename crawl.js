const { JSDOM } = require('jsdom');

function getUrlFromHtml(htmlBody, baseURL) {
  let urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    // Check if the link element is relative or absolute then convert
    if (linkElement.href.slice(0, 1) === '/') {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href); // Append the base URL if the link is absolute
      } catch (e) {
        console.log(`error with relative url: ${e.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href); // Append the base URL if the link is absolute
      } catch (e) {
        console.log(`error with absolute url: ${e.message}`);
      }
    }
  }
  return urls;
}

function normalizeUrl(url) {
  // Check if the url empty
  if (!url) {
    return '';
  }
  const urlObj = new URL(url); // URL object automatically turn URL into lowercase
  let strippedUrl = `${urlObj.hostname}${urlObj.pathname}`;
  if (strippedUrl.length > 0) {
    // Remove the trailing slash from the URL if it exists
    while (strippedUrl.endsWith('/')) {
      strippedUrl = strippedUrl.slice(0, -1);
    }
  }
  return strippedUrl;
}

module.exports = { normalizeUrl, getUrlFromHtml };
