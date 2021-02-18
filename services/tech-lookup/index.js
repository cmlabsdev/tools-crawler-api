const Wappalyzer = require('../functions/driver');

const Analyzer = class {
  constructor() {
    this.wappalyzer = new Wappalyzer({});
    this.wappalyzer.init()
      .then(() => {
        console.log("Ready to use");
      })
  }
  
  async analyze(url) {
    let site = await this.wappalyzer.open(url);
    const result = site.analyze();
    site.destroy();
    return result;
  }
}

module.exports = new Analyzer;
