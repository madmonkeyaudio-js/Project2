module.exports = (req, res, next) => {
    //if the user is logged in. Great. 
    //Otherwise, user is not logged in. Not cool. Don't let them in
    if(req.user && req.user.admin) {
        //Cool. This is expected, they are logged in. Allow them to proceed. 
        next();
    } else if(req.user) {
        req.flash('error', 'Hey! You are not an admin! Quit sneaking around!')
        req.redirect('/profile')
    } else {
        //Not cool. Don't let them in. Make them log in first
        req.flash('error', 'You must be logged in as an Admin to view this page!')
        res.redirect('/auth/login')
    }
};