"use strict";
var Main_1 = require("../../js/Main");
require("./Flashmessage");
var UrlService = (function () {
    function UrlService($location, $flash) {
        this.$location = $location;
        this.$flash = $flash;
    }
    UrlService.prototype.redirect = function (module, action, id, msg, type) {
        if (type === void 0) { type = 'success'; }
        if (typeof (msg) !== 'undefined' && msg != '') {
            this.$flash.create(msg, type);
        }
        if (action == '') {
            action = module;
        }
        this.$location.url(this.make(module, action, id));
    };
    UrlService.prototype.make = function (module, action, id, params) {
        if (action === void 0) { action = ""; }
        if (params === void 0) { params = {}; }
        var url = module;
        if (action !== "") {
            url += '-' + action;
            if (typeof (id) !== 'undefined' && id !== null) {
                url += '-' + id;
            }
        }
        var first = true;
        for (var i in params) {
            if (first) {
                url += "?";
                first = false;
            }
            else {
                url += "&";
            }
            url += i + "=" + params[i];
        }
        return url;
    };
    UrlService.prototype.makeTemplate = function (module, action) {
        if (action === void 0) { action = ""; }
        return Main_1.PhpangularModule.servername + "template/" + module + "/" + action + "/" + action + '-' + Main_1.PhpangularModule.version + '.html';
    };
    UrlService.prototype.makeApi = function (module, action, id, params) {
        module = module['ucFirst']();
        var url = module;
        if (action !== "") {
            url += '/' + action;
            if (typeof (id) !== 'undefined' && id !== null) {
                url += '/' + id;
            }
        }
        url += '.json';
        if (typeof (params) !== 'undefined') {
            var first = true;
            for (var i in params) {
                if (first) {
                    url += "?";
                    first = false;
                }
                else {
                    url += "&";
                }
                url += i + "=" + params[i];
            }
        }
        return url;
    };
    return UrlService;
}());
exports.UrlService = UrlService;
UrlService.$inject = ['$location', 'FlashmessageService'];
