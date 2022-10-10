__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
res.sendFile(__path + '/view/home.html')
})
router.get('/page', (req, res) => {
res.sendFile(__path + '/view/index.html')
})
router.get('/tiktok', (req, res) => {
res.sendFile(__path + '/public/tiktok.html')
})
router.get('/game.html', (req, res) => {
res.sendFile(__path + '/view/game.html')
})
router.use(function (req, res) {
res.status(404)
res.sendFile(__path + '/view/404.html')
});

module.exports = router
