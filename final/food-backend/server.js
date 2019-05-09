const http = require('http');
const port = 3000;
const account = require('./models/account.js');
const express = require('express');
const event = require('./models/listing.js');
var sha1 = require('sha1');

var app = express()

app.route('/*')
    .get(function(req, res) {
          res.sendFile(path.join(__dirname + '/dist/index.html'));
});

module.exports = app;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req, res) {
    res.send('server is running')
})

app.get('/login/:user/:password', function(req, res){
    
    var returnObject = new Object()
    returnObject.successful = false
    account.login(req.params.user, sha1(req.params.password), returnObject, function() {
        console.log(returnObject)
        res.send(returnObject)
    })

});

app.get('/loadlistings/:username', function(req, res) {
    var returnObject = new Object()
    event.loadEvents(req.params.username, returnObject, function() {
        console.log(returnObject)
        res.send(returnObject)
    })
});

var server = app.listen(3000, function() {

})
