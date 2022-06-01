const express = require("express");
const app = express();
const port = 3001;

let jsonData = require("./data/input.json");

app.get("/getData", (req, res) => {
  return res.send(jsonData.AuditoriumData);
});

app.post("/getDataByDate", (req, res) => {
  console.log();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
