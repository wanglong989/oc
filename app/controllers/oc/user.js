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
        res.redirect('/');
    }
    next();
};


//signup
exports.signup = function (req, res) {

    var _user = req.body.user;
    User.find({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user.length > 0) {
            res.redirect('/signin');
        } else {
            var user = new User(_user);
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect(static_admin_base_url + '/user/list');
            })
        }
    });
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
        if (!user) {
            return res.redirect('/signup');
        } else {
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

exports.showSignup = function (req, res) {

    console.log('signup');
    res.render('user/signup', {
        title: 'user signup'
    })
};

exports.showSignin = function (req, res) {
    res.render('user/signin', {
        title: 'user signin'
    })
};