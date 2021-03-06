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

app.get("/api/:country", (req, res) => {

  const country = req.params.country;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${process.env.API_KEY}`;

  const getData = () => {
    request(url, (error, response, body) => {
      if (response.statusCode === 200) {
        console.log("Status Code: ", response.statusCode);
        res.send(body);
      } else {
        console.log('Status Code:', response && response.statusCode);
        console.error('error:', error);
        res.sendStatus(response.statusCode);
      }
    });
  }
  getData();
})

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Your Application is running on port ${PORT}`);
});
