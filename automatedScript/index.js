/**
 * @description 爬虫某站排行榜数据
 */
const puppeteer = require('puppeteer');

// 1. 使用页面生成数据
(async () => {
  const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1920, height: 1080 } });
  const page = await browser.newPage();
  await page.goto('https://top.baidu.com/board?tab=realtime');
  const content = await page.$eval('#sanRoot > main > div.container.right-container_2EFJr > div > div:nth-child(2)', ele => ele.innerText);
  console.log('使用页面生成数据', content);
})();


// 2. 直接获取接口返回数据
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800
    }
  });
  const page = await browser.newPage();
  const aimUrl = 'https://api.bilibili.com/x/web-interface/popular?ps=20&pn=1';
  // await page.setRequestInterception(true);
  // page.on('request', interceptedRequest => {
  // 	const url = interceptedRequest.url();
  //   if(url === aimUrl) {
  //     interceptedRequest.continue();
  //   } else {
  //     interceptedRequest.abort();
  //   }
  // });
  page.on('response', async interceptedResponse => {
    if (interceptedResponse.url() === aimUrl) {
      console.log('直接获取接口返回数据', await interceptedResponse.json());
    }
  });
  await page.goto('https://www.bilibili.com/v/popular/all');
  browser.close();
})();