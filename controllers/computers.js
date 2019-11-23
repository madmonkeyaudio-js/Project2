
const express = require('express')
const router = express.Router();
const axios = require('axios');
const db = require('../models');

router.get('/', (req,res) => {

    var bestBuyUrl = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=${process.env.API_KEY}&format=json`;
    // Use request to call the API
    axios.get(bestBuyUrl)
    .then(function(apiResponse) {
      var elements = apiResponse.data.products;
      res.render('partials/productRender', {
        elements: elements
      })
    })
  })

  router.post('/view', (req, res) => {
 
      db.item.findOne({
        where: {
          productId: req.body.sku
        }
      }).then((item) => {
        if(item !== null) {
          item.getUsers().then((users) => {
            res.render('singleItem', {
              users: users
            })
          })
        }else {
          res.render('beTheFirst')
        } 
      })
    })
module.exports = router;