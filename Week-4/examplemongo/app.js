const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const express = require("express");
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');


const url = "mongodb://localhost:27017";
const dbName = "exampleMongo";
const client = new MongoClient(url, {useNewUrlParser:true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;




client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);



  readDocument(db, "documents")
});

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


const updateDocument = (db, doc, callback) => {
  const collection = db.collection("documents");
  collection.updateOne({
    first_name: "Zafir"
  }, {$set:{age:21}}, function(err, result) {
    assert.equal(err, null);
    console.log("Successfully updated document");
  });

};

const readDocument = (db, doc, callback) => {
  var resultArray = [];

  let docum;
  let cursor = db.collection(doc).find({first_name:"Razin", last_name: "Ahmed"}).toArray((err, docs)=> {
    console.log(docs.length === 0);
    client.close();
  });

  
};