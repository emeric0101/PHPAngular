var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
            var DebugEntry = (function () {
                function DebugEntry(nbRequest, time, queries) {
                    this.nbRequest = nbRequest;
                    this.time = time;
                    this.queries = queries;
                }
                return DebugEntry;
            }());
            var AjaxService = (function () {
                function AjaxService($http, $url) {
                    this.$http = $http;
                    this.$url = $url;
                }
                AjaxService.prototype.callback = function (data, success) {
                    if (data.data.debug != undefined) {
                        console.info(new DebugEntry(data.data.debug.currentQuery, ((data.data.debug.end - data.data.debug.start) * 1000) + ' ms', data.data.debug.queries));
                    }
                    if (typeof (success) === 'function') {
                        success(data);
                    }
                };
                AjaxService.prototype.get = function (url, data, success, error) {
                    var _this = this;
                    this.$http({
                        url: url,
                        data: data,
                        method: "GET",
                    }).then(function (r) { return _this.callback(r, success); }, error);
                };
                AjaxService.prototype.post = function (url, data, success, error) {
                    var _this = this;
                    if (success === void 0) { success = function (d) { }; }
                    this.$http({
                        url: url,
                        data: data,
                        method: "POST",
                    }).then(function (r) { return _this.callback(r, success); }, error);
                };
                return AjaxService;
            }());
            AjaxService.$inject = ['$http', 'UrlService'];
            Service.AjaxService = AjaxService;
            phpangularModule.service("AjaxService", AjaxService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
