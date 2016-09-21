var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title:String,
    author:String,
    summary:String,
    content:String,
    add_time:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

/**
 * 每次保存更新时间
 */
ArticleSchema.pre('save',function(next){
   if(this.isNew){
       this.meta.createAt = this.meta.updateAt = Date.now();
   }else{
       this.meta.updateAt = Date.now();
   }
    next();
});

/**
 * 查找全部数据
 */
ArticleSchema.statics = {
    fetch : function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById : function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    },
    save: function(cb) {
        return this
            .save()
            .exec(cb);
    }
};

module.exports = ArticleSchema;

