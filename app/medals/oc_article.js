var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/oc_article');

var Article = mongoose.model('Article',ArticleSchema);


module.exports = Article;