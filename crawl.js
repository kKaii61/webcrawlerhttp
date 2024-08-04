const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
  console.log('Actively crawl page: ' + currentURL);
  // fetching the current page
  try {
    const resp = await fetch(currentURL);
    // TODO: Should make the error handling more detail than just resp.status > 399
    // Need to make a research on this error handling
    if ((await resp.status) > 399) {
      console.error(
        'Error in feconnection: ' + resp.status + ' on page ' + currentURL
      );
      return;
    }

    // Check if the page content is html
    const contentType = resp.headers.get('content-type');
    console.log(contentType);

    if (!contentType.includes('text/html')) {
      console.log('Non HTML response, content type is ' + contentType);
      return;
    }
    console.log(await resp.text());
  } catch (error) {
    console.error(`error in fetching: ${error.message}, on page ${currentURL}`);
  }
}

function getUrlFromHtml(htmlBody, baseURL) {
  let urls = [];
  const dom = new JSDOM(htmlBody);
  // Get all the <a> tags in the HTML page.
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

module.exports = { normalizeUrl, getUrlFromHtml, crawlPage };
