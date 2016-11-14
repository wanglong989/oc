var article = require('../../medals/oc_article');
var _ = require('underscore');

var static_base_url = 'http://localhost:3000';
var static_admin_base_url = 'http://localhost:4000';


//index page
exports.index = function(req,res){
    res.render('index',{
        title:'鹿灵 管理后台页',
        isIndex:true
    })
};

//add article page
exports.articleAdd = function(req,res){
    res.render('add',{
        title:'添加 菜谱',
        article:{
            content:'',
            title:'',
            author:'',
            add_time:'',
            summary:''
        }
    })
};

//update article page
exports.articleUpdate = function(req,res){
    var id =req.params.id;

    if(id){
        article.findById(id,function(err,article){
            res.render('add',{
                title:'鹿灵 管理的后台录入也',
                article:article
            })
        });
    }
};


// article post add
exports.articleActionAdd = function(req,res){
    var id = req.body.article._id;
    var articleObj = req.body.article;
    var _article;

    if(id !== 'undefined'){
        article.findById(id,function(err,article){

            if(err){
                console.log(err);
            }

            _article = _.extend(article,articleObj);

            _article.save(function(err,article){
                if(err){
                    console.log(err);
                }
                res.redirect(static_base_url+'/detail/' + article._id)
            });
        });
    }else{
        _article = new article({
            content:articleObj.content,
            title:articleObj.title,
            add_time:articleObj.add_time,
            summary:articleObj.summary,
            author:articleObj.author
        });

        _article.save(function(err, article) {
            if(err) {
                console.log(err);
            }
            res.redirect('/detail/' + article._id);
        });
    }
};

//admin list page
exports.articleList = function(req,res){

    article.fetch(function(err,article_list){
        if(err){
            console.log(err);
        }
        res.render('list',{
            title:'鹿灵 管理后列表页',
            article_list:article_list,
            static_base_url:static_base_url
        })
    });

};

exports.articleActionDel = function(req,res){
    var id = req.query.id;

    if(id){
        article.remove({_id: id}, function(err, movie) {
            if(err) {
                console.log(err);
            }
            else {
                res.json({result:'1'})
            }
        });
    }
};