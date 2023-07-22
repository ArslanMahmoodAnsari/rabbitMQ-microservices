// imports
const express = require("express");
const morgan = require("morgan");

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Billing service is live");
});

// ! INVENTORY CRUD OPERATIONS
app.get("/billing", (req, res) => {
  res.send("GET BILLING");
});

app.post("/billing", (req, res) => {
  console.log('===============billing=====================');
  console.log(req.body);
  console.log('====================================');
  res.send("POST BILLING");
});

app.put("/billing", (req, res) => {
  res.send("PUT BILLING");
});

app.delete("/billing", (req, res) => {
  res.send("DELETE BILLING");
});

app.listen(5005, () => {
  console.log('server started on port 5005');
});

