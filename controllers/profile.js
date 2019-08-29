const isLoggedIn = require('../middleware/isLoggedIn')
const isAdminLoggedIn = require('../middleware/isAdminLoggedIn')
const router = require('express').Router();
const db = require('../models');
const override = require('method-override');
router.use(override('_method'));

//GET profile
router.get('/', isLoggedIn, (req, res) => {
    //console.log(req.user.dataValues.id);
    res.render('profile/index')
})
//GET /profile/admin
router.get('/admin', isAdminLoggedIn, (req, res) => {
    res.render('profile/admin')
})
router.delete('/:name', (req, res) => {
    db.user.destroy({
        where: {
            firstname: req.params.name,
            id: req.body.id
        }
    })
    .then(() => {
        res.redirect('/auth/signup')
    })
    .catch(err => {
        console.log(err);
    })
})
router.put('/:id', (req, res) => {
    console.log('put it down boyyyy')
    db.user.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(user => {
        user.update({
            username: req.body.username,
            email: req.body.email,
            profile: req.body.profile
        })
        .then(() => {
            res.redirect('/auth/login')
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;
