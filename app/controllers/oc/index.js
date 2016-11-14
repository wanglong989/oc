var article = require('../../medals/oc_article');
var _ = require('underscore');

//index page
exports.index = function (req, res) {
    article.fetch(function (err, article_list) {

        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: '鹿灵',
            article_list: article_list
        })

    });

};
