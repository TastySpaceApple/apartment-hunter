const express = require('express');
const db = require('../db');
let router = express.Router();

router.get('/get-all', async function(req,res){
  const posts = await db.getAllApartments();
  res.json(posts)
})

router.get('/get-next', async function(req,res){
  const post = await db.getNextApartment(1);
  res.json(post);
})


router.get('/get-saved', async function(req,res){
  const posts = await db.getSavedApartments(1);
  res.json(posts);
})

router.post('/save-choice-and-get-next', async function(req, res){
  await db.saveUserChoice(1, req.body.postId, req.body.choice);
  const post = await db.getNextApartment(1);
  res.json(post);
})

module.exports = router;
