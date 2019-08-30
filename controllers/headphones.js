const express = require('express');
const router = express();
const axios = require('axios');

router.get('/', (req, res) => {
   var bestBuyUrl = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0204000))?apiKey=${process.env.apiKey}&format=json`;

   axios.get(bestBuyUrl)
   .then(function(apiResponse){
        var elements = apiResponse.data.products;
        res.render('partials/productRender', {
            elements: elements
        })
   })
})

module.exports = router;