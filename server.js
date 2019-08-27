
//THIS DOTENV declares your port, so if you need to change it you can in .env file
require('dotenv').config(); //YOU DO NOT NEED TO DECLARE THIS IN A VARIABLE

const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passportConfig')
const moment = require('moment');

app.set('view engine', 'ejs')
app.use(layouts);
app.use('/', express.static('static'))
app.use(express.urlencoded({ extended: false})) //THIS IS THE IMPORTANT BIT TO TRANSLATE WHAT USER INPUTS
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//custom middleware write data to locals for EVERY page
app.use((req, res, next) => {
    res.locals.alerts = req.flash();
    res.locals.user = req.user;
    res.locals.moment = moment;
    next();
})

//CONTROLLERS
app.use('/auth', require('./controllers/auth.js'))
app.use('/profile', require('./controllers/profile'))
app.use('/items', require('./controllers/items'))
app.use('/computers', require('./controllers/computers'))

//ROUTES
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('*', (req, res) => {
    res.render('404.ejs');
})
app.listen(process.env.PORT, () => {
    console.log('Wheee! Server is now running at ' + process.env.PORT)
})