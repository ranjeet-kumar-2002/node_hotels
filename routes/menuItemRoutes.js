const express = require('express');
const router = express.Router();

const menuItem = require('../models/menuItem');

// post method to add a menu Item

router.post('/',async (req, res) =>{
    try {
      const data = req.body; 
      const newMenu = new menuItem(data); 
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
     } 
      catch (err) {
         console.log(err);
         res.status(500).json({error:'Internal Server Error'});
     }
  });

  // get method to menu items
  
  router.get('/',async (req, res) =>{
    try {
      const data = await menuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
     } 
      catch (err) {
         console.log(err);
         res.status(500).json({error:'Internal Server Error'});
     }
  });

  // comment added for testing
  module.exports = router;
