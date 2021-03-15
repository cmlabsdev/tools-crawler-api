const crawler = require('advanced-sitemap-generator')
const crypto = require('crypto')

const SitemapGenerator = class {
  init(server) {
    const io = require('socket.io')(server, {
      origins: '*:*'
    });
    
    io.on('connection', (socket) => {
      console.log('connected cok')
      let filenames = []
      let connectedGenerator = {}
      let cancel = false
      socket.on('crawl', (url) => {
        console.log('crawl', url);
        cancel = false
        const check = new RegExp(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
        if (url.match(check)) {
          let hashing = crypto.createHash('md5').update(url + new Date().getTime() + crypto.randomBytes(9999)).digest('hex')
          const generator = crawler(url, {
            stripQuerystring: false,
            ignoreHreflang: true,
            filepath: `${process.cwd()}/storage/sitemap/${hashing}/sitemap.xml`
          })
          
          connectedGenerator[socket.id] = generator
          
          generator.on('add', (url) => {
            let stats = generator.getStats()
            socket.emit('update queue', {
              site_length: stats.added,
              url: url.url,
            })
          })
          
          generator.on('done', () => {
            socket.emit('result', {
              hash: hashing,
              data: generator.getStats().urls,
              url: url,
              date: new Date().getTime()
            })
          })
          
          generator.start()
        } else {
          socket.emit('notfound', ('Invalid URL, use https or http'))
        }
      })
      
      socket.on('disconnect', () => {
        console.log('dc')
        delete connectedGenerator[socket.id]
      })
      
      socket.on('stop', msg => {
        console.log('stop')
        connectedGenerator[socket.id].stop()
      })
    });
  }
}

module.exports = new SitemapGenerator();
