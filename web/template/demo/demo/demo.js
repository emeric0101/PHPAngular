var Emeric0101;
(function (Emeric0101) {
    var PHPAngular;
    (function (PHPAngular) {
        var Controller;
        (function (Controller) {
            var MainController = (function () {
                function MainController($url) {
                    this.$url = $url;
                }
                return MainController;
            }());
            MainController.$inject = ['UrlService'];
            phpangularModule.controller("MainController", MainController);
        })(Controller = PHPAngular.Controller || (PHPAngular.Controller = {}));
    })(PHPAngular = Emeric0101.PHPAngular || (Emeric0101.PHPAngular = {}));
})(Emeric0101 || (Emeric0101 = {}));
