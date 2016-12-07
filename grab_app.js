var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');



var monggose = require('mongoose');
monggose.Promise = require('bluebird');

/**
 * 链接数据库
 */
var dbUrl = 'mongodb://localhost/oc';
monggose.connect(dbUrl);


var aid = 5057831;
var targetUrl = 'http://36kr.com/p/'+ aid +'.html';

//网站标识 虎嗅网：1   36kr：2   百度百家：3   美食杰 ：4   美食天下 ： 5
// var url_type = "1";
// var web_name = '虎嗅网';
//
var url_type = "2";
var web_name = '36kr';
//
//var url_type = "3";
//var web_name = '百度百家';

// var url_type = "4";
// var web_name = '美食杰';

//var url_type = "5";
//var web_name = '美食天下';


var _grab, content, title;

var Grab = require('./app/medals/oc_grab');


var getArticle = function(){
    superagent.get(targetUrl).end(function (err, res) {

        var $ = cheerio.load(res.text);

        // console.log(res.text);

        //虎嗅
        // title = $('title').text();
        // content = $('.article-content-wrap').text();

        //36kr
        title = $('title').text();
        content = $('.content').text();


        _grab = new Grab({
            content: content,
            title: title,
            web_name: web_name,
            target_url:targetUrl
        });

        console.log(res);

        // if(!!content){
        //     _grab.save(function (err, article) {
        //         if (err) {
        //             console.log(err);
        //         }
        //         console.log("抓取存储成功!");
        //     });
        // }

        aid = aid - 1;
        targetUrl = 'http://36kr.com/p/'+ aid +'.html';
        // getArticle();

        // return true;
    });
};

getArticle();





//

//虎嗅
// if (url_type == '1') {
//    content = $('.article-content-wrap').text();
//    title = $('.t-h1').text();
// }
////36kr
//if (url_type == '2') {
//    content = $('.content-font').html();
//    title = $('h1').html();
//}
//
////百度百家
//if (url_type == '3') {
//    content = $('.article-detail').text();
//    title = $('h1').text();
//}
//
////美食杰
//if (url_type == '4') {
//    content = $('.edit').text();
//    title = $('#tongji_title').text();
//}
//
////美食天下
//if (url_type == '5') {
//    content = $('.recipDetail').html();
//    title = $('.recipe_De_title a').text();
//}
//
//



//遍历获取内容

//if (err) {
//    return console.error(err);
//}
//
//var topicUrls = [];
//
//var $ = cheerio.load(res.text);
//
//// 获取首页所有的链接
//$('#index_zzw_main .zzw_item ul li a').each(function (idx, element) {
//    var $element = $(element);
//    var href = url.resolve(targetUrl, $element.attr('href'));
//    //console.log(href);
//    topicUrls.push(href);
//    //topicUrls[0] = href;
//});
//
//
////第一步：得到一个 eventproxy 的实例
//var ep = new eventproxy();
////第二步：定义监听事件的回调函数。
////after方法为重复监听
////params: eventname(String) 事件名,times(Number) 监听次数, callback 回调函数
//ep.after('topic_html', topicUrls.length, function(topics){
//    // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
//    //.map
//    topics = topics.map(function(topicPair){
//        //use cheerio
//        var topicUrl = topicPair[0];
//        var topicHtml = topicPair[1];
//        var $ = cheerio.load(topicHtml);
//        return ({
//            title: $('#tongji_title').text().trim(),
//            href: topicUrl,
//            comment1: $('.edit').text().trim()
//        });
//    });
//    //outcome
//    console.log('outcome:');
//    console.log(topics);
//});
////第三步：确定放出事件消息的
//topicUrls.forEach(function (topicUrl) {
//    superagent.get(topicUrl)
//        .end(function (err, res) {
//            console.log('fetch ' + topicUrl + ' successful');
//            ep.emit('topic_html', [topicUrl, res.text]);
//        });
//});
