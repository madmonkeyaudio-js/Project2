//Require passport and any passport strategies we want to use

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//We will need to access the database
const db = require('../models');

//Provide serialization/deserialization functions for passport to use
//This allows passport to store user by the id alone (serialize) and look up a user's 
//full information from the id (deserialize)

passport.serializeUser((user, callbackFunction) => {
//callbackFunction: first argument is an error message, second argument is the data it passes on
callbackFunction(null, user.id);
});

passport.deserializeUser((id, callbackFunction) => {
    db.user.findByPk(id)    //findByPk means find by primary key!!!!!!!
    .then(user => {
        callbackFunction(null, user)
    })
    .catch(callbackFunction) //Since the error in this case is already addressed as null
});


//Implement strategies
//local strategy has two arguments. The first is an object with settings, the other is a callback function
passport.use(new LocalStrategy({
    //These are the column names in your table
    usernameField: 'email',
    passwordField: 'password'
}, (typedInEmail, typedInPassword, callbackFunction) => {
//Try looking up our user by the email
db.user.findOne({
    where: {
        email: typedInEmail
    }
})
.then(foundUser => {
    //if i didn't find a user with that email - OR - I found the user but they don't have the correct password, 
    //return an error

    if (!foundUser || !foundUser.validPassword(typedInPassword)){
        //BAD user: return null
        callbackFunction(null, null)
    }else {
        //GOOD user: return the user's data
        callbackFunction(null, foundUser)
    }
})
.catch(callbackFunction)//End of user findOne call
}));


//Make sure we cn e3xport the file to be imported on another page


module.exports = passport;