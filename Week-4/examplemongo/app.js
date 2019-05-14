const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const express = require("express");
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');


const url = "mongodb://localhost:27017";
const dbName = "exampleMongo";
const client = new MongoClient(url, {useNewUrlParser:true});
const COL = "users"

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
});

app.get('/', (req, res) => {
  res.render("index", {create: false, createMsg: '', read: false, readMsg: '', update: false, updateMsg: '', deleted: false, deleteMsg: '' });
})


app.post('/create', (req,res) => {
  console.log(req.body);

  let lname = req.body.lname;
  let fname = req.body.fname;

  const db = client.db(dbName);
  const collection = db.collection(COL);
  collection.insertOne({
    first_name: fname,
    last_name: lname
  }, (err, result)=> {
    assert.equal(err, null);
    console.log("Successfully entered data into database");
  });
 

  res.render('index', {create: true, createMsg: 'Successfully entered data in database', read: false, readMsg: '', update: false, updateMsg: '', deleted: false, deleteMsg: '' })
});

app.post('/read', (req, res) => {
  let fname = req.body.fname;
  let data; 
  
  const db = client.db(dbName);
  const collection = db.collection(COL);

  let cursor = collection.find({first_name: fname}).toArray((err, docs)=> {
    if (docs.length === 0) {
      data = "This data does not exist";
    }
    data = docs[0];
    console.log(data);
    console.log(typeof data);
    res.render("index", {create: false, createMsg: '', read: true, readMsg: data, update: false, updateMsg: '', deleted: false, deleteMsg: '' })
  });

});

app.post('/update', (req,res) => {
  fname = req.body.fname;
  msg = req.body.msg;

  let updateMsg;
  
  const db = client.db(dbName);
  const collection = db.collection(COL);
  collection.updateOne({
    first_name: fname
  }, {$set:{msg:msg}}, function(err, result) {
    assert.equal(err, null);
    if (result.result.nModified === 0) {
      updateMsg = "Could not find user in database";
    } else {
      updateMsg = "Successfully updated user";
      console.log("Successfully updated document");
    }

    res.render("index", {create: false, createMsg: '', read: false, readMsg: '', update: true, updateMsg: updateMsg, deleted: false, deleteMsg: ''});
  });

});

app.post('/delete', (req, res) => {
  fname = req.body.fname;

  let deleteMsg;

  const db = client.db(dbName);
  const collection = db.collection(COL);
  collection.deleteOne({ 
    first_name: fname
  }, function(err, result) {
    assert.equal(err, null);
    if (result.deletedCount === 0) {
      deleteMsg = "Could not find user in database";
      console.log("Couldn't find user");
    }
    else {
      deleteMsg = "Successfully removed user";
      console.log("Successfully removed user");
    }
    
    res.render("index", {create: false, createMsg: '', read: false, readMsg: '', update: false, updateMsg: '', deleted: true, deleteMsg: deleteMsg });

  });
});


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})


const insertDocuments = function(db, collec, callback) {
  const collection = db.collection(collec);
  collection.insertMany([
    { first_name : "Zafir",
      last_name: "Hasan",
      gender: "Male"
    }, 
    { first_name : "Razin",
      last_name: "Ahmed",
      gender: "Male"
  },
    { first_name: "Lenay",
      last_name: "Dem",
      gender: "Female"
    } 
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("inserted 3 documents into the collection");
    callback(result);
  });
}
