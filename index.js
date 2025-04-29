// index.js
const express = require("express");
const cors = require("cors");
const { verifyMessage } = require("@multiversx/sdk-core");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/verify-signature", (req, res) => {
  const { address, message, signature } = req.body;

  try {
    const valid = verifyMessage(message, signature, address);
    res.json({ verified: valid });
  } catch (e) {
    res.status(400).json({ error: "Invalid signature", details: e.message });
  }
});

app.get("/", (req, res) => {
  res.send("Realm² Signature API ready.");
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});
