const express = require('express')
const router = express.Router();
const db = require('../models')
const passport = require('../config/passportConfig')
const axios = require('axios');

router.get('/', (req,res) => {
    // Use request to call the API
    var bestBuyUrl = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=${process.env.apiKey}&sort=bestSellingRank.dsc&format=json`;

    axios.get(bestBuyUrl)
    .then(function(apiResponse) {
      var elements = apiResponse.data.products;
      res.render('lists/laptops', {
        elements: elements
      })
    })
  })

module.exports = router;