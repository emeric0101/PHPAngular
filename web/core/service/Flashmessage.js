"use strict";
var FlashmessageService = (function () {
    function FlashmessageService() {
        this.buffer = [];
    }
    FlashmessageService.prototype.getBuffer = function () {
        return this.buffer;
    };
    FlashmessageService.prototype.remove = function (flash) {
        var newBuffer = [];
        for (var i in this.buffer) {
            if (this.buffer[i] === flash) {
                continue;
            }
            newBuffer.push(this.buffer[i]);
        }
        this.buffer = newBuffer;
    };
    FlashmessageService.prototype.create = function (msg, type) {
        this.buffer.push({
            msg: msg,
            type: type
        });
    };
    return FlashmessageService;
}());
exports.FlashmessageService = FlashmessageService;
FlashmessageService.$inject = [];
