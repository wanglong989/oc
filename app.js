var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var monggose = require('mongoose');
monggose.Promise = require('bluebird');


var port = process.env.POST || 3000;
var app = express();



/**
 * 链接数据库
 */
var dbUrl = 'mongodb://localhost/oc';
monggose.connect(dbUrl);

app.set('views', './app/views/oc/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
//用户session
app.use(cookieParser());
app.use(session({
    secret: 'cook',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

/**
 * 配置 本地，测试，生产
 */
if ('development' === app.get('env')) {
    app.set('showStackError', true);//显示测试信息
    app.locals.pretty = true;
    monggose.set('debug', true);
}

app.locals.moment = require('moment');


require('./config/oc/routes.js')(app);

app.listen(port);
console.log('onHome started on port ' + port);



