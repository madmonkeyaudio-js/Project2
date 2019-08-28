const express = require('express');
const router = express();
const db = require('../models');

router.get('/', (req, res) => {
    res.render('profile/wishList')
})

router.post('/', (req, res) => {
    if(req.user) {
        db.user.findByPk(db.user.dataValues.id)
        .then(user => {
            
        })
    }
})
module.exports = router;