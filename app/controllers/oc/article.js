var article = require('../../medals/oc_article');

//detail page
exports.detail = function (req, res) {

    var id = req.params.id;
    article.findById(id, function (err, article) {
        if (err) {
            console.log(err);
        }
        res.render('detail', {
            title: '瞄一眼 详情页',
            article: article
        })
    });

};
