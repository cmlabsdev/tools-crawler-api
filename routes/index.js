const express = require('express');
const router = express.Router();
const Analyzer = require('../functions');
const validUrl = require('valid-url')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({message: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'})
});

router.get('/api/analyze', async (req, res) => {
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
