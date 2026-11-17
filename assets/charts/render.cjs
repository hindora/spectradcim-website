// Renders the four chart panels in charts.html to PNG (2x), one file per panel.
//   NODE_PATH=<folder holding playwright-core> node assets/charts/render.cjs <out-folder>
// Then convert to public/shots/<name>.webp and update _sizes.json (see to_webp.py).
const path = require('path');
const { chromium } = require('playwright-core');

(async () => {
  const out = process.argv[2] || __dirname;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 960, height: 1400 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(__dirname, 'charts.html').replace(/\\/g, '/'));
  for (const id of ['power-draw', 'power-pue', 'thermal-intake', 'thermal-band']) {
    await page.locator('#' + id).screenshot({ path: path.join(out, id + '.png') });
    console.log('saved', id);
  }
  await browser.close();
})();
