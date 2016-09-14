module Emeric0101.PHPAngular.Service {
    export class AjaxService {
        static $inject = ['$http', 'UrlService'];
        get(url : string,
            data : {},
            success? : (data) => void,
            error?: (data) => void) {
                this.$http({
                    url: url,
                    data: data,
                    method: "GET",
                }).then(success, error);
        }
        post(url : string,
            data : {},
            success? : (data) => void,
            error?: (data) => void) {
                this.$http({
                    url: url,
                    data: data,
                    method: "POST",
                }).then(success, error);
        }

        constructor(private $http, private $url) {
        }
    }
    phpangularModule.service("AjaxService", AjaxService);
}
