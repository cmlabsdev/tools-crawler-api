const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/download/:folder', (req, res) => {
  const folder = req.params.folder.replace('..', '').replace('/', '')
  if (fs.existsSync(`${process.cwd()}/resource/sitemap/${folder}/sitemap.xml`)) {
    res.download(`${process.cwd()}/resource/sitemap/${folder}/sitemap.xml`)
  } else {
    res.status(404).send({
      code: 404,
      message: "file not found"
    })
  }
});

module.exports = router;
