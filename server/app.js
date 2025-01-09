const express = require("express");

const app = express();

// Midlvares visokios
app.use(express.json());

module.exports = app;
