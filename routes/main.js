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
router.get('/vendor.bundle.base.js', (req, res) => {
res.send(__path + '/vendors/js/vendor.bundle.base.js')
}
module.exports = router
