const express = require("express");

const app = express();
const port = 3001;

var bodyParser = require("body-parser");

app.use(bodyParser.json());

let jsonData = require("./data/input.json");

app.get("/getData", (req, res) => {
  return res.send(jsonData.AuditoriumData);
});

app.post("/getDataByDate", (req, res) => {
  const dates = req.body.dateandTime;
  const toDate = Date.parse(dates[0]);
  const fromDate = Date.parse(dates[1]);
  const results = [];
  jsonData.AuditoriumData.map((values) => {
    if (values.DateAndTime >= toDate || fromDate <= values.DateAndTime) {
      results.push(values);
    }
  });
  console.log(results);
  return res.send(results);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
