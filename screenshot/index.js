/**
 * @description 截图
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 946 } });
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  await page.screenshot({ path: __dirname + '/baidu.png' });

  await browser.close();
})();