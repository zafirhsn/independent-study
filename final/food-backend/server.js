const http = require('http');
const account = require('./models/account.js');
const express = require('express');
const listing = require('./models/listing.js');
var sha1 = require('sha1');

var app = express();

const port = 3000;


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

app.get('/signup/:username/:password/:name', function(req, res) {

    var returnObject = new Object()
    account.signup(req.params.username, sha1(req.params.password), req.params.name, returnObject, function() {
        res.send(returnObject)
    })
});

app.get('/createlisting/:username/:item/:count', (req,res) => {

    var returnObject = new Object()
    listing.createListing(req.params.username, req.params.item, req.params.count, returnObject, function() {
        console.log(returnObject)
        res.send(returnObject)
    })
});


app.get('/loadlistings/:username', function(req, res) {
    var returnObject = new Object()
    listing.loadlistings(req.params.username, returnObject, function() {
        console.log(returnObject)
        res.send(returnObject)
    })
});

app.get('/claimitem/:username/:owner/:item/:count', (req, res) => {
    var returnObject = new Object()

    let username = req.params.username;
    let owner = req.params.owner;
    let item = req.params.item;
    let count = req.params.count;

    listing.claimItem(username, owner, item, count, returnObject, function() {
        console.log(returnObject)
        res.send(returnObject)
    })
});

app.get('/settings/:username/:password/:npassword1', (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    let npassword1 = req.params.npassword1;
    
    var returnObject = new Object()
    account.updatePassword(username, password, npassword1, returnObject, function() {
        console.log(returnObject);
        res.send(returnObject);
    })

});

var server = app.listen(3000, function() {
    console.log(`Backend server is listening on port ${port}`);
})
