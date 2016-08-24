module Emeric0101.PHPAngular.Controller {
    class MainController {
        static $inject = ['UrlService'];

        constructor(
            private $url : Emeric0101.PHPAngular.Service.UrlService
        ){
        }
    }
    phpangularModule.controller("MainController", MainController);

}
