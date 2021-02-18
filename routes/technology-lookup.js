const express = require('express');
const rateLimiter = require('express-rate-limit');

const router = express.Router();
const Analyzer = require('../services/tech-lookup');
const validUrl = require('valid-url')

const limiter = rateLimiter({
  statusCode: 200,
  windowMs: 60 * 60 * 1000, // Limit 1 hour
  max: 5, // for 5 request,
  message: {
    statusCode: 429,
    message: 'Request Limit Exceeded'
  }
})

// router.use(limiter);
router.get('/tech-lookup', async (req, res) => {
  const {url} = req.query;
  
  if (!validUrl.isUri(url)) {
    return res.send({
      statusCode: 422,
      message: 'URL is not valid'
    })
  }
  
  try {
    const result = await Analyzer.analyze(url);
    
    let _testResponse = result.urls[Object.keys(result.urls)[0]]
    
    if(_testResponse.status === 0){
      throw new Error(_testResponse.error);
    }
    
    return res.send({
      statusCode: 200,
      message: 'Analyze Complete',
      data: result
    })
    
  } catch (e) {
    return res.send({
      statusCode: 500,
      message: e.message
    })
  }
});

module.exports = router;
