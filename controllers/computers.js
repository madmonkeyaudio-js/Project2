
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
      res.render('lists/computers.ejs', {
        elements: elements
      })
    })
  })

// router.post('/', (req,res) => {
//     if(req.user){
//       db.user.findByPk(req.user.dataValues.id)
//       .then(user => {
//         db.item.findOrCreate({
//           where: {
//             productId: req.body.sku,
//             name: req.body.name,
//             price: req.body.price
//           }
//         }).spread((item, created) => {
//           //console.log(item);
//           user.addItem(item).then(() => {
//             res.redirect('/myItems')
//           })
//         }).catch(err => {
//           console.log(err);
//         })
//       })
//     }
//   })
  
module.exports = router;