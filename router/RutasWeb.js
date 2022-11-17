// RutasWeb.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // console.log(__dirname)
  res.render("index", { titulo: 'La tiendita de "Don Pepe"' });
});

module.exports = router;
