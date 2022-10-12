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

async function tiktok(url){
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            author: "WandyGans",
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

try {
result = await tiktok(query)
var img = await fetch(reuslt.media[1].url)
var getBuffer = await img.buffer()
await fs.writeFileSync(__path + '/tmp/image.mp4', getBuffer)
res.sendFile(__path + '/tmp/image.mp4')
} catch (e) {
res.json({ data: e })
console.log(e)
}
})

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
