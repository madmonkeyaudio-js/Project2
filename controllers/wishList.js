const express = require('express');
const router = express();
const db = require('../models');


router.post('/', (req, res) => {
    //console.log('Wheeeeee!')
    if(req.user) {
        db.user.findByPk(req.user.dataValues.id)
        .then(user => {
            db.wishitem.findOrCreate({
                where: {
                    productId: req.body.sku,
                    name: req.body.name,
                    price: req.body.price
                }
            }).spread((wishitem, created) => {
                user.addWishitem(wishitem).then(() => {
                    res.redirect('/wishList')
                })
            }).catch(err => {
                console.log(err);
            })
        })
    }
})
router.get('/', (req, res) => {
    db.wishitem.findAll()
    .then((items) => {
        console.log(items);
        res.render('profile/wishList', {
            items: items
        })
    })
})

module.exports = router;