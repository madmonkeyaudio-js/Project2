const express = require('express');
const router = express();
const db = require('../models')

router.get('/', (req, res) => {
    if(req.user){
        db.item.findAll()
        .then((items) => {
            console.log(items);
             res.render('profile/myItems', {
                 items: items
             })
            }).catch(err => {
            console.log(err);
        })
    }
})


module.exports = router;