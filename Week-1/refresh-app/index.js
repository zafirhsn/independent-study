// Refresher app created to review some topics from Dynamic Web Applications

/*
Create an app that displays the weather for cities based on the inputed route. Use Node.js, Express, a Weather API, EJS, and Bootstrap to create the app. 
*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const qs = require("querystring");
const config = require("./config");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;
app.listen(port, ()=> {
  console.log(`Server is listening on port ${port}`);
})

console.log(config.apikey);

app.get('/', (req, res)=> {
  res.render("city", {temp: "", city: ""});
});

app.post('/', (req, res)=> {
  let regex = / /g;
  req.body.city.replace(regex, '%20');

  res.redirect(`/weather/${req.body.city}`);
});

app.get("/weather/:city", (req, res)=> {

  let url = "http://api.openweathermap.org/data/2.5/weather?" +  
    qs.stringify({
      q: req.params.city==="tokyo" ? req.params.city + ",jp" : req.params.city + ",us",
      appid: config.apikey
    });

    request.get(url, (err, response, body)=> {
      if (err) {
        console.log("There was an error!");
        console.log(err);
      }
      else if (!err && response.statusCode === 200) {
        let bodyJSON = JSON.parse(body);
        console.log(bodyJSON);
        res.render("city", {temp: ((bodyJSON.main.temp - 273.15) * (9/5) + 32), city: req.params.city});
      }

    });

  // request.get("")

});