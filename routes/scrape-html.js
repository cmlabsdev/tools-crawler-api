const express = require('express');
const router = express.Router();
const validUrl = require('valid-url')
const HtmlScraper = require('../services/scraper');

router.get('/scrape', async (req, res) => {
  const {url} = req.query;
  
  if (!validUrl.isUri(url)) {
    console.log(url)
    return res.send({
      statusCode: 422,
      message: 'URL is not valid'
    })
  }
  
  res.send({
    statusCode: 200,
    html: await HtmlScraper.request(url)
  });
});

module.exports = router;
