const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/sitemap-generator/download/:folder', (req, res) => {
  const folder = req.params.folder.replace('..', '').replace('/', '')
  if (fs.existsSync(`${process.cwd()}/storage/sitemap/${folder}/sitemap.xml`)) {
    res.download(`${process.cwd()}/storage/sitemap/${folder}/sitemap.xml`)
  } else {
    res.status(404).send({
      code: 404,
      message: "file not found"
    })
  }
});

router.delete('/sitemap-generator/delete/:folder', (req, res)=>{
  let folder = req.params.folder.replace('..','').replace('/','')
  if(fs.existsSync(`${process.cwd()}/storage/sitemap/${folder}/sitemap.xml`)){
    fs.unlink(`${process.cwd()}/storage/sitemap/${folder}/sitemap.xml`, err => {
      if (err){
        res.status(500).send({
          code : 500,
          message : err.message
        })
      }else {
        res.status(200).send({
          code : 200,
          message : "File was deleted"
        })
      }
    })
  }else{
    res.status(404).send({
      code : 404,
      message : "file not found"
    })
  }
})

module.exports = router;
