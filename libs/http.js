var url = require('url');
var crypto = require('crypto');
var request = require('request');
var _ = require('lodash');


function Http(domain) {
    this.domain = domain;
}

/**
 * 统一请求接口
 * @param {string} path 请求路径，bui自动拼接成完整的url
 * @param {object} params 请求参数集合
 * @param {function} callback  回调，请求成功与否都会触发回调，成功回调会回传数据
 * @returns {null} 
 **/
Http.prototype.get = function(path, params, callback) {
    var url = this.joinParams(path, params);
    var obj = {
        method: 'GET',
        url: url,
        json: true
    };
    console.log('get ===> ', url, JSON.stringify(obj, null, 4), '<===');
    request(obj, function(err, response, body) {
        callback && callback(err, body);
    });
}

Http.prototype.post = function(path, params, postData, callback) {
    var url = this.joinParams(path, params);
    var obj = {
        method: 'POST',
        url: url,
        body: postData,
        json: true
    };
    console.log('post ===> ', url, JSON.stringify(obj, null, 4), '<===');
    request(obj, function(err, response, body) {
        callback && callback(err, body);
    });
}

Http.prototype.joinParams = function(path, params) {
    var url = this.domain + path;
    if (Object.keys(params).length > 0) {
        url = url + "?";
        for (var key in params) {
            url = url + key + "=" + params[key] + "&";
        }
        var length = url.length;
        if (url[length - 1] == '&') {
            url = url.substring(0, length - 1);
        }
    }
    return url;
}

module.exports = Http;