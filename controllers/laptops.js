const express = require('express')
const router = express.Router();
const axios = require('axios');
const db = require('../models');

router.get('/', (req,res) => {
    // Use request to call the API
    var bestBuyUrl = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=${process.env.API_KEY}&sort=bestSellingRank.dsc&format=json`;

    axios.get(bestBuyUrl)
    .then(function(apiResponse) {
      var elements = apiResponse.data.products;
      res.render('partials/productRender', {
        elements: elements
      })
    })
  })

module.exports = router;