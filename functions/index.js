const Wappalyzer = require('./driver');

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
    return site.analyze();
  }
}

module.exports = new Analyzer;
