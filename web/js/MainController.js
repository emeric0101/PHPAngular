var phpangularModule = angular.module('phpangularModule', ['ngRoute']);
var PhpangularModule;
(function (PhpangularModule) {
    PhpangularModule.servername = '';
    PhpangularModule.debug = true;
    phpangularModule.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/:module?-:method?-:id?', {
                templateUrl: function (params) {
                    return PhpangularModule.servername + "template/" + params.module + "/" + params.method + "/" + params.method + '.html';
                }
            })
                .when('/:module?-:method?', {
                templateUrl: function (params) {
                    if (typeof (params.module) === 'undefined') {
                        params.module = "home";
                    }
                    return PhpangularModule.servername + "template/" + params.module + "/" + params.method + "/" + params.method + '.html';
                }
            })
                .when('/:module?', {
                templateUrl: function (params) {
                    if (typeof (params.module) === 'undefined') {
                        params.module = "home";
                    }
                    return PhpangularModule.servername + "template/" + params.module + "/" + params.module + "/" + params.module + '.html';
                }
            })
                .otherwise({
                templateUrl: PhpangularModule.servername + 'template/home/home/home.html'
            });
        }]);
})(PhpangularModule || (PhpangularModule = {}));
