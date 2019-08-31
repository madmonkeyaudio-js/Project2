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
router.post('/', (req,res) => {
    if(req.user){
      db.user.findByPk(req.user.dataValues.id)
      .then(user => {
        db.item.findOrCreate({
          where: {
            productId: req.body.sku,
            name: req.body.name,
            price: req.body.price,
            shortDescription: req.body.comment
          }
        }).spread((item, created) => {
          //console.log(item);
          user.addItem(item).then(() => {
            res.redirect('/myItems')
          })
        }).catch(err => {
          console.log(err);
        })
      })
    }
  })


module.exports = router;