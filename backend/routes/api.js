const express = require('express');
const db = require('../db');
let router = express.Router();

router.get('/get-all', async function(req,res){
  const posts = await db.getAllApartments();
  res.json(posts)
})

module.exports = router;
