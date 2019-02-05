// Refresher app created to review some topics from Dynamic Web Applications

/*
Create an app that displays the weather for cities based on the inputed route. Use Node.js, Express, a Weather API, EJS, and Bootstrap to create the app. 
*/

const app = require("express")();
const config = require("./config");

console.log(config.apikey);

app.get("/")