var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
var { color } = require('./lib/color.js')

var mainrouter = require('./routes/main')
    apirouter = require('./routes/api')

var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("assets"))

app.use('/', mainrouter)
app.use('/page', apirouter)

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app
