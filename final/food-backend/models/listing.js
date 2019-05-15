const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "foodwaste";
const client = new MongoClient(url, {useNewUrlParser:true});

const errorMessage = "Error: ";
const emailNotFoundMessage = "Email not found";
const wrongPasswordMessage = "Wrong password";
const loginSuccessMessage = "Login success";

// Mongo collections in foodwaste db
const ACCOUNTS = "accounts";
const LISTINGS = "listings";


function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

client.connect((err) => {
  if (err) {
    console.log("An error occurred when trying to connect to the database");
    console.log(err);
  }
  else {
    assert.equal(null, err);
    console.log("Connected successfully to database");
  }
});

module.exports = {
  
  loadlistings(username, returnObject, callback) {

    const db = client.db(dbName);  
    let cursor = db.collection(ACCOUNTS).find({}).toArray((err, docs)=> {
      console.log("LOADING LISTINGS");
      console.log(docs);
      returnObject.data = {};
      returnObject.data.mylistings = [];
      returnObject.data.alllistings = [];

      for (let i = 0; i < docs.length; i++) {
        if (docs[i].username === username) {
          returnObject.data.mylistings.push(...docs[i].mylistings);
          returnObject.data.alllistings.push(...docs[i].mylistings);
        }
        else {
          for (let listing of docs[i].mylistings) {
            console.log(listing)
            returnObject.data.alllistings.push(listing)
          }
        }
      }
      console.log(returnObject.data.mylistings.length);
      console.log()
      callback();
      return 
    });
  },

  createListing(username, item, count, returnObject, callback) {

    let listing = {
      item: item,
      count: parseFloat(count),
      owner: username,
      claimed: false
    }

    const db = client.db(dbName);  
    let cursor = db.collection(ACCOUNTS).updateOne(
      {username: username},
      {$push: { mylistings:  listing }}, function(err, result) {
      
      assert.equal(err, null);
      if (result.result.nModified === 0) {
        returnObject.successfull = false;
        returnObject.message = "Could not find user in database";
        callback()
        return;
      } else {
        returnObject.successfull = true;
        returnObject.message = "Successfully added item";
        console.log("Successfully updated document");
        callback();
        return;
      }
    });
  },

  claimItem(username, owner, item, count, returnObject, callback) {

    const db = client.db(dbName);  

    count = parseFloat(count);

    let cursor = db.collection(ACCOUNTS).updateOne(
      { "mylistings.item" : item, "mylistings.count": count, "mylistings.owner": owner, "mylistings.claimed": false }, { $set: { 'mylistings.$.claimed' : true}}, function(err, result) {
      
      if (result.result.nModified === 1) {
        console.log("successfully updated database");
        returnObject.successfull = true;
      }
    });

    db.collection(ACCOUNTS).updateOne({username: username}, {$push: { mylistings: {item: item, count: count, owner: owner, claimed: true} } }, function(err, result) {
      if (result.result.nModified === 1) {
        console.log("Successfully claimed food item")
        returnObject.successfull = true;
      }
      else {
        returnObject.successfull = false;
      }
      callback();
    });

    
  }

};
