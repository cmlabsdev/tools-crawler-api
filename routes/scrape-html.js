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
  
  try {
    const html = await HtmlScraper.request(url)
  
    res.send({
      statusCode: 200,
      html: html
    });
  } catch (e){
    res.send({
      statusCode: 500,
      message: e.message
    })
  }
});

module.exports = router;
