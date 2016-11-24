var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
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
                    console.log(msg);
                };
                return FlashmessageService;
            }());
            FlashmessageService.$inject = [];
            phpangularModule.service("FlashmessageService", FlashmessageService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
