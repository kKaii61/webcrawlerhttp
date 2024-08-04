const { crawlPage } = require('./crawl.js');
const { createReport } = require('./report.js');
async function main() {
  if (process.argv.length < 3) {
    console.log('No Website Provided!');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Too many commands line arguments!');
    process.exit(1);
  }
  // The first element of process.argv is the process execution path
  // and the second element is the path for the js file.
  // Then the rest is the arguments for the node.js
  //   for (const arg of process.argv) {
  //     console.log(arg);
  //   }

  const baseURL = process.argv[2];
  console.log('Starting Crawl website of ' + baseURL);
  const pages = await crawlPage(baseURL, baseURL, {});
  createReport(pages);
}

main();
