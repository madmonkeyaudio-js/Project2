const express = require('express');
const router = express();
const db = require('../models');


router.post('/', (req, res) => {
    //console.log('Wheeeeee!')
    if(req.user) {
        db.user.findByPk(req.user.dataValues.id)
        .then(user => {
            db.wishitems.findOrCreate({
                where: {
                    productId: req.body.sku,
                    name: req.body.name,
                    price: req.body.price
                }
            }).spread((wishitem, created) => {
                user.addWishitems(wishitem).then(() => {
                    res.redirect('/wishList')
                })
            }).catch(err => {
                console.log(err);
            })
        })
    }
})

router.get('/', (req, res) => {
    //console.log(req.user.dataValues.id)
    if(req.user) {
        db.user.findOne({
            where: {
                id: req.user.dataValues.id
            }
        }).then(user => {
            user.getWishitems().then(items => {
                res.render('profile/wishList', {
                    items: items
                })
            })
        })
    }
})

module.exports = router;