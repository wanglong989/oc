var mongoose = require('mongoose');
var bcrypt = require('bcrypt');//密码加密加盐

var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    name: {
        unique: true, //唯一
        type: String
    },
    password: {
        type: String
    },
    //0 : number user
    // > 50 super admin
    role:{
        type:Number,
        default:0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

/**
 * 每次保存更新时间
 */
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    /**
     * 加密加盐算法
     */
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//实例方法
UserSchema.methods = {
    comparePassword:function(_passwork,cb){
        bcrypt.compare(_passwork,this.password, function (err,isMatch) {
            if(err) return cb(err);

            cb(null,isMatch);
        })
    }
}

/**
 * 查找全部数据
 */
UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    },
    save: function (cb) {
        return this
            .save()
            .exec(cb);
    }
};

module.exports = UserSchema;

