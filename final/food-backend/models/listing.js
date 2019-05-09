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

module.exports = {
  
  loadEvents(username, returnObject, callback) {

    client.connect((err) => {
      if (err) {
        console.log("Error occurred during load listings");
        returnObject.message = "Error: " + err;
        callback();
        return;     
      }
      else {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);  
          
        let cursor = db.collection(LISTINGS).find({user_name: username}).toArray((err, docs)=> {
          if (typeof docs[0].listings === "undefined") {
            returnObject.message = "no events found";
            callback();
            return;
          }
          else {
            returnObject.listings = [];
            for (let i = 0; i < docs[0].listings.length; i++) {
              returnObject.listings.push(docs[0].listings.length);
            }
            callback();
          }
        });
      }
    });
  } 
};
