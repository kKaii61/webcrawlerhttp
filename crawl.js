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

module.exports = normalizeUrl;
