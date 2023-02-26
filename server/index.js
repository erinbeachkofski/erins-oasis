const express = require('express');
const app = express();
const port = 3001;
const cors = require("cors");
const plant_model = require('./plant_model.js');

app.use(cors());
app.use(express.json());

app.get("/api/", (req, res) => {
  plant_model.getPlants()
    .then(response => {
      res.json(response);
    })
});


app.listen(port, () => {
    console.log("Server is listening on port 3001");
});