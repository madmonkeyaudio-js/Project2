
const express = require('express')
const router = express.Router();
const db = require('../models')
const passport = require('../config/passportConfig')
const axios = require('axios');

router.get('/', (req,res) => {

    var bestBuyUrl = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=${process.env.apiKey}&format=json`;
    // Use request to call the API
    axios.get(bestBuyUrl)
    .then(function(apiResponse) {
      
      var elements = apiResponse.data.products;
      //console.log(elements);
      res.render('lists/computers.ejs', {
        elements: elements
      })
      })
    
})

router.post('/', (req,res) => {
  console.log('SKU', req.body.price)
    if(req.user){
      db.user.findOne(req.user.id)
      .then(user => {
        db.item.findOrCreate({
                id: req.body.sku,
                name: req.body.name,
                price: req.body.price
              })
            })
      .spread((item, created) => {
        user.addItem(item).then(() => {
          //res.something something
        })
      })
    }
  })
  //res.render('myFaves.ejs');
//})

// router.get('/:id', (req,res) => {
  
//       res.render('singleItems/singleComp.ejs', {
//         elements: req.params.id
      
//       })
// })
module.exports = router;