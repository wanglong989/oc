var Admin = require('../../app/controllers/admin_oc/admin');
var User = require('../../app/controllers/admin_oc/user');


module.exports = function (app) {

    // user session
    app.use(function (req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });

    //index page
    app.get('/',User.signinRequired,User.adminRequired, Admin.index);


    //Admin
    app.get('/article/list',Admin.articleList);

    app.get('/article/add',Admin.articleAdd);
    app.get('/article/update/:id',Admin.articleUpdate );

    app.post('/article/action/add',Admin.articleActionAdd);
    app.post('/article/action/del',Admin.articleActionDel);


    //User
    app.get('/user/list',User.userList );
    app.post('/user/signin',User.signin );
    app.get('/user/logout',User.logout);
    app.get('/signin',User.showSignin);
};
