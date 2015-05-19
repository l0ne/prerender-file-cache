/**
 * Created by vsuhanov on 21.04.14.
 * Updated by Rene Bakx 17-10-2014. Uses a hash of the URL instead of the filename.
 */

var cache_manager = require('cache-manager');
var crypto = require('crypto');
var fs = require('node-fs');

module.exports = {
    init: function () {
        var path = process.env.CACHE_ROOT_DIR;
        fs.exists(path, function (exists) {
            if (exists === false) {
                fs.mkdirSync(path, '0777', true);
            }
        });
        this.cache = cache_manager.caching({
            store: file_cache
        });
    },

    beforePhantomRequest: function (req, res, next) {
        if (req.method !== 'GET') {
            return next();
        }

        this.cache.get(req.prerender.url, function (err, result) {
            if (!err && result) {
                var now = new Date();
                res.send(200, result);
            } else {
                next();
            }
        });
    },

    afterPhantomRequest: function (req, res, next) {
        if (req.prerender.statusCode == 200) {
            this.cache.set(req.prerender.url, req.prerender.documentHTML);
        }
        next();
    }
};


var file_cache = {
    get: function (key, callback) {
        var path = process.env.CACHE_ROOT_DIR;
        var cache_live_time = process.env.CACHE_LIVE_TIME;
        var static_pages = process.env.CACHE_STATIC_LOCATIONS;
        console.log(key);
        console.log(static_pages);

        var cachename = path + crypto.createHash('md5').update(key.replace("/", "_")).digest('hex');
        fs.exists(cachename, function (exists) {
            if (exists === false) {
               return callback(null);
            }
            var date = new Date();
            if (date.getTime() - fs.statSync(cachename).mtime.getTime() > cache_live_time * 1000) {
                return callback(null)
            }

            fs.readFile(cachename, callback);

        });

    },
    set: function (key, value, callback) {
        var path = process.env.CACHE_ROOT_DIR;
        var cachename = path + crypto.createHash('md5').update(key.replace("/", "_")).digest('hex');
        fs.exists(path, function (exists) {
            if (exists === false) {
                fs.mkdirSync(path, '0777', true);
            }
            fs.writeFile(cachename, value, callback);

        });

    }
};


