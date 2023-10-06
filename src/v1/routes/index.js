/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Welcome to server!!!");
});

module.exports = router;
