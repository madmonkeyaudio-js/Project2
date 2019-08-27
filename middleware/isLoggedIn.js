module.exports = (req, res, next) => {
    //if the user is logged in. Great. 
    //Otherwise, user is not logged in. Not cool. Don't let them in
    if(req.user) {
        //Cool. This is expected, they are logged in. Allow them to proceed. 
        next();
    } else {
        //Not cool. Don't let them in. Make them log in first
        req.flash('error', 'You must be logged in to view this page!')
        res.redirect('/auth/login')
    }
};