"use strict";
var StorageService = (function () {
    function StorageService() {
    }
    StorageService.prototype.store = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };
    StorageService.prototype.get = function (key) {
        var value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return null;
        }
    };
    return StorageService;
}());
exports.StorageService = StorageService;
