require("dotenv").config({ path: __dirname + "/../.env" });
const path = require("path");
const express = require("express");
const cors = require("cors");
const request = require('request');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("../client/build"));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.get("/api/:country", (req, res) => {

  const country = req.params.country;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.API_KEY}`;

  const getData = () => {
    request(url, (error, response, body) => {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        console.log("Status Code: ", response.statusCode);
        res.send(data);
      } else {
        console.log('Status Code:', response && response.statusCode);
        console.error('error:', error);
        res.sendStatus(response.statusCode);
      }
    });
  }
  getData();
})

app.listen(PORT, () => {
  console.log(`Your Application is running on port ${PORT}`);
});
