const express = require('express')
const router = express.Router();
const db = require('../models')
const passport = require('../config/passportConfig')


router.get('/signup', (req,res) => {
    res.render('auth/signup')
})
router.post('/signup', (req, res, next) => {
    if (req.body.password !== req.body.passwordVerify){
        req.flash('error', 'Passwords do not match!')
        res.redirect('/auth/signup')
    }else {
      //Passwords matched, create user if they don't already exist
        db.user.findOrCreate({
            where: { email: req.body.email }, 
            //IF you need to create, use req.body
            defaults: req.body
        })
        //the promise. .spread is different than .then
        .spread((user, wasCreated) => {
            if(wasCreated){
                //This was legitimately a new user, so they got created
                passport.authenticate('local', {
                    successRedirect: '/profile',
                    successFlash: 'Yay you win!',
                    failureRedirect: '/auth/login', 
                    failureFlash: 'Uh - Oh! Invalid Credentials'
                })(req, res, next);
            } else {
                //The user was found, don't let them create a new account, make the log in
                req.flash('error', 'Account already exists. Please log in!')
                res.redirect('/auth/login');
            }
        })
        .catch(err => {
            //Print the error to the console
            console.log('ERROR in POST /auth/signup', err);
            //Generate generic error flash message
            req.flash('error', 'Oh poop!')
            //Get a validation specific error if the user needs to know something
            if (err && err.errors){
                err.errors.forEach(err => {
                    if (err.type === 'Validation error'){
                        req.flash('error', 'Validation issue - ' + err.message)
                    }
                })
            }
            //REDIRECT user to the signup page so they can try again
            res.redirect('/auth/signup');
        })
    }
})
router.get('/login', (req,res) => {
    res.render('auth/login')
})
//passport.authenticate takes two arguments, where, and what to do if it succeeds/fails
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    //successFlash: 'Yay you win!',
    failureRedirect: '/auth/login', 
    failureFlash: 'Uh - Oh! Invalid Credentials'
}));

router.get('/logout', (req,res) => {
    req.logout(); //Deletes the user from req.user
    //req.flash('success', 'Goodbye - See you next time!')
    res.redirect('/');
});



module.exports = router;