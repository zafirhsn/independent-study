const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const sha1 = require('sha1');
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
  login(user_input, password_input, returnObject, callback) {

    const db = client.db(dbName);  
      
    let cursor = db.collection(ACCOUNTS).find({username: user_input }).toArray((err, docs)=> {

      if (docs.length === 0) {
        console.log(`couldn't find user with username ${user_input}`);
        returnObject.message = emailNotFoundMessage;
      }
      else { 
        // Does not account for users having the same username
        if (docs[0].password === password_input) {
          returnObject.message = loginSuccessMessage;
          returnObject.data = docs[0];
          returnObject.successful = true;
          console.log(`Successfully logged in ${user_input}`);
        }
        else {
          console.log("wrong password");
          returnObject.message = wrongPasswordMessage;
        }
      }  
      callback()
    });  
  },

  signup(new_username, new_password, new_name, returnObject, callback) {

    const db = client.db(dbName);  
    
    let cursor = db.collection(ACCOUNTS).find({user_name: new_username }).toArray((err, docs)=> { 
      if (docs.length > 0) {
        returnObject.successful - false;
        returnObject.message = "There is already a user with that username"
        returnObject.duplicate = true;
        callback();
      }
      else {
        db.collection(ACCOUNTS).insertOne({
          username: new_username,
          name: new_name,
          password: new_password,
          mylistings: []
        }, (err, results) => {
            assert.equal(err, null);
            console.log("Successfully entered user into database");

            returnObject.duplicate = false
            returnObject.successful = true
            returnObject.message = 'Successfully created a new account'
            callback()
          });
        }
      });   
    },

    updatePassword(username, password, npassword1, returnObject, callback) {
      const db = client.db(dbName); 
      

      let cursor = db.collection(ACCOUNTS).updateOne({ username: username, password: password}, {$set: {password: npassword1}}, function(err,result) {
          if (result.result.nModified === 1) {
            console.log("Password change successfull");
            returnObject.successfull = true;
            callback();
          }
          else {
            console.log("Could not update password")
            returnObject.successfull = false;
            callback();
          }

        })
    }
};

