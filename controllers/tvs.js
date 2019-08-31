const express = require('express');
const router = express();
const axios = require('axios');

router.get('/', (req, res) => {
   var bestBuyUrl = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0101000))?apiKey=${process.env.apiKey}&facet=bestSellingRank,1&format=json`;

   axios.get(bestBuyUrl)
   .then(function(apiResponse){
        var elements = apiResponse.data.products;
        res.render('partials/productRender', {
            elements: elements
        })
   })
})

module.exports = router;