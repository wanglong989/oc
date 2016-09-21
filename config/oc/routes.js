var Index = require('../../app/controllers/oc/index');
var User = require('../../app/controllers/oc/user');
var Article = require('../../app/controllers/oc/article');


module.exports = function (app) {

    // user session
    app.use(function (req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });

    //index page
    app.get('/', Index.index);

    //detail page
    app.get('/detail/:id',User.signinRequired,User.adminRequired,Article.detail);


    //User
    app.post('/user/signup',User.signup);
    app.post('/user/signin',User.signin );
    app.get('/user/logout',User.logout);
    app.get('/signup',User.showSignup);
    app.get('/signin',User.showSignin);

};
