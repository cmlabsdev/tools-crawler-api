const express = require('express');
const router = express.Router();

const technologyLookupRouter = require('./technology-lookup');
const scrapeHtmlRouter = require('./scrape-html');
const sitemapGeneratorRouter = require('./sitemap-generator')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({message: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'})
});

router.use('/api', technologyLookupRouter);
router.use('/api', scrapeHtmlRouter);
router.use('/api', sitemapGeneratorRouter)

module.exports = router;
