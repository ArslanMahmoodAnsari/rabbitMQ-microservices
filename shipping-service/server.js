// imports
const express = require("express");
const morgan = require("morgan");

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Shipping service is live");
});

// ! SHIPPING OPERATIONS
app.get("/shipping", (req, res) => {
  res.send("GET SHIPPING");
});

app.post("/shipping", async(req, res) => {
  try {
    await fetch('http://billing-service:5005/billing', {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
      "Content-type": "application/json"
    }
  })
    res.send("POST SHIPPING");
  } catch (error) {
    res.send("POST SHIPPING ERROR");
  }
});

app.put("/shipping", (req, res) => {
  res.send("PUT SHIPPING");
});

app.delete("/shipping", (req, res) => {
  res.send("DELETE SHIPPING");
});

app.listen(5000, () => {
  console.log('server started on port 5000');
});
