var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Service;
        (function (Service) {
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
            Service.StorageService = StorageService;
            phpangularModule.service("StorageService", StorageService);
        })(Service = PHPAngular.Service || (PHPAngular.Service = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
