var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
            var AjaxService = (function () {
                function AjaxService($http, $url) {
                    this.$http = $http;
                    this.$url = $url;
                }
                AjaxService.prototype.get = function (url, data, success, error) {
                    this.$http({
                        url: url,
                        data: data,
                        method: "GET",
                    }).then(success, error);
                };
                AjaxService.prototype.post = function (url, data, success, error) {
                    this.$http({
                        url: url,
                        data: data,
                        method: "POST",
                    }).then(success, error);
                };
                AjaxService.$inject = ['$http', 'UrlService'];
                return AjaxService;
            }());
            Service.AjaxService = AjaxService;
            phpangularModule.service("AjaxService", AjaxService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
