const puppeteer = require('puppeteer');

const Crawler = class {
  constructor() {
    puppeteer.launch()
      .then((_browser) => {
        this.browser = _browser;
        console.log('Puppeteer ready to use');
      });
  }
  
  async request(url) {
    if (this.browser === undefined) {
      throw new Error('API is not ready to use')
    }
  
    let page = await this.browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });
    let content = await page.content();
    await page
    page.close();
    return content;
  }
}

module.exports = new Crawler();
