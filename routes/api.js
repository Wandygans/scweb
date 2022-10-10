__path = process.cwd()

var express = require('express');

var axios = require('axios');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var ggs = require('google-it');
var router  = express.Router();
var creator = "WandyGans"

var { color, bgcolor } = require(__path + '/lib/color.js');
var { fetchJson } = require(__path + '/lib/fetcher.js')
var options = require(__path + '/lib/options.js');
var { getBuffer } = require(__path + '/lib/function.js');

_ = require('lodash')
__path = process.cwd();

loghandler = {
query: {
status: false,
message: "query is missing!"
}
}


router.get('/off', async (req, res, next) => {
res.json({ d })
})
	
router.get('/google', async (req, res, next) => {
var query = req.query.query
if (!query) res.json(loghandler.query)
try {
result = await ggs({'query' : `${query}`})
res.json({ 
status: true,
creator: creator,
result
})
} catch (e) {
res.sendFile(__path + '/assets/404.html')
}
})

router.get('/darkjoke', async (req, res, next) => {
try {
result = await fetchJson(`https://raw.githubusercontent.com/Wandygans/database/main/darkjoke.js`)
randKey = result[Math.floor(Math.random() * result.length)]
var img = await fetch(randKey.result)
var getBuffer = await img.buffer()
await fs.writeFileSync(__path + '/tmp/image.jpg', getBuffer)
res.sendFile(__path + '/tmp/image.jpg')
} catch (e) {
res.sendFile(__path + '/assets/404.html')
}
})

router.get('/katabucin', async (req, res, next) => {
try {
result = await fetchJson(`https://raw.githubusercontent.com/Wandygans/database/main/katabucin.json`)
randKey = result[Math.floor(Math.random() * result.length)]
result = randKey.result;
res.json({ 
status: true,
creator: creator,
result 
})
} catch (e) {
res.sendFile(__path + '/assets/404.html')
}
})

router.get('/tiktok', async (req, res, next) => {
var query = req.query.query
if (!query) res.json(loghandler.query)
async function tiktok(query) {
return new Promise((resolve, reject) => {
axios("https://lovetik.com/api/ajax/search", {
method: "POST",
data: new URLSearchParams(Object.entries({ query }))
})
.then(({ data }) => {
if (!data.vid) {
resolve(data)
return !0
}
resolve({
desc: clean(data.desc),
uploader: clean(data.author),
thumbnail: data.cover,
medias: {
nowm: {
size: data.links[0].s || '',
url: data.links[0].a || ''
},
watermark: {
size: data.links[1].s || '',
url: data.links[1].a || ''
},
audio: {
sound: clean(data.links[2].s || ''),
url: data.links[2].a || ''
}
}
        })
      })
   })
}
try {
var img = await fetch(medias.nowm.url)
var getBuffer = await img.buffer()
await fs.writeFileSync(__path + '/tmp/image.mp4', getBuffer)
res.sendFile(__path + '/tmp/image.mp4')
} catch (e) {
res.json({ data: e })
}
})
}

router.get('/quotes', async (req, res, next) => {
try {
result = await fetchJson(`https://raw.githubusercontent.com/Wandygans/database/main/quotes.json`)
data = result[Math.floor(Math.random() * result.length)]
result = data.result;
res.json({ status: true,
creator: creator,
result
})
} catch (e) {
res.sendFile(__path + '/assets/404.html')
}
})


module.exports = router
