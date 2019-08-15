
//THIS DOTENV declares your port, so if you need to change it you can in .env file
require('dotenv').config(); //YOU DO NOT NEED TO DECLARE THIS IN A VARIABLE

const express = require('express')
const app = express()
const layouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(layouts);
app.use('/', express.static('static'))
app.use(express.urlencoded({ extended: false})) //THIS IS THE IMPORTANT BIT TO TRANSLATE WHAT USER INPUTS

//CONTROLLERS
app.use('/auth', require('./controllers/auth.js'))
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