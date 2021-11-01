/**
 * @description 获取页面html元素，并存储到本地
 */
const fs = require('fs-extra');
const path = require('path')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 946 } });
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  const content = await page.$eval('html', ele => ele.outerHTML);
  fs.writeFile(path.join(__dirname, 'baidu.html'), content);

  await browser.close();
})();