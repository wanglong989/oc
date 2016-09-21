var User = require('../../medals/oc_user');
var static_base_url = 'http://localhost:3000';
var static_admin_base_url = 'http://localhost:4000';


//midware
exports.signinRequired = function(req, res,next){
    var user = req.session.user;
    if(!user){
        res.redirect('/signin');
    }
    next();
};
exports.adminRequired = function(req, res,next){
    var user = req.session.user;
    if(user.role <= 50){
        res.redirect('/signin');
    }
    next();
};

//signin
exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = req.body.user.name;
    var password = req.body.user.password;


    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    console.log(err)
                }
                if (isMatch) {
                    req.session.user = user;
                    return res.redirect('/');
                } else {
                    return res.redirect('/signin');

                    console.log('Password is not match');
                }
            })
        }
    });
};

//logout
exports.logout = function (req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
};


exports.showSignin = function (req, res) {
    res.render('user/signin', {
        title: 'user signin'
    })
};


exports.userList = function (req, res) {
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render('users',{
            users: users
        })
    });
};