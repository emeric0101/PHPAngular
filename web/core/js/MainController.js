var phpangularmodules = phpangularmodules || [];
phpangularmodules.push('ngRoute');
var phpangularModule = angular.module('phpangularModule', phpangularmodules);
var PhpangularModule;
(function (PhpangularModule) {
    PhpangularModule.servername = '';
    PhpangularModule.version = '0000002';
    PhpangularModule.debug = true;
    phpangularModule.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/:module?-:method?-:id?', {
                templateUrl: function (params) {
                    return PhpangularModule.servername + "template/" + params.module + "/" + params.method + "/" + params.method + '-' + PhpangularModule.version + '.html';
                }
            })
                .when('/:module?-:method?', {
                templateUrl: function (params) {
                    if (typeof (params.module) === 'undefined') {
                        params.module = "home";
                    }
                    return PhpangularModule.servername + "template/" + params.module + "/" + params.method + "/" + params.method + '-' + PhpangularModule.version + '.html';
                }
            })
                .when('/:module?', {
                templateUrl: function (params) {
                    if (typeof (params.module) === 'undefined') {
                        params.module = "home";
                    }
                    return PhpangularModule.servername + "template/" + params.module + "/" + params.module + "/" + params.module + '-' + PhpangularModule.version + '.html';
                }
            })
                .otherwise({
                templateUrl: PhpangularModule.servername + 'template/home/home/home' + '-' + PhpangularModule.version + '.html'
            });
        }]);
})(PhpangularModule || (PhpangularModule = {}));
