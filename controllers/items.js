const express = require('express')
const router = express.Router();
// const db = require('../models')
// const passport = require('../config/passportConfig')
// const axios = require('axios');

router.get('/', (req,res) => {
   
    res.render('items.ejs')
})




module.exports = router;