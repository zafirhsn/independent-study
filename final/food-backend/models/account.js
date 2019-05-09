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
  login(user_input, password_input, returnObject, callback) {

    client.connect((err) => {
      if (err) {
        console.log(`Error occurred during login() with email ${user_input}. `, err);
        returnObject.message = errorMessage + err;
      }
      else {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);  
          
        let cursor = db.collection(ACCOUNTS).find({user_name: user_input }).toArray((err, docs)=> {

          if (docs.length === 0) {
            console.log(`couldn't find user with email ${user_input}`);
            returnObject.message = emailNotFoundMessage;
          }
          else { 
            // Does not account for users having the same username
            if (docs[0].pwd === password_input) {
              returnObject.message = loginSuccessMessage;
              returnObject.data = data;
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
      };
    });
  }


  
};
