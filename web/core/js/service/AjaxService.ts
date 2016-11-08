module Emeric0101.PHPAngular.Service {
    export class AjaxService {
        static $inject = ['$http', 'UrlService'];
        private callback(data: any, success : (data) => void) {
            if (data.data.debug != undefined) {
                console.log(data.data.debug);
            }
            if (typeof(success) === 'function') {
                success(data);
            }
        }

        get(url : string,
            data : {},
            success? : (data) => void,
            error?: (data) => void) {
                this.$http({
                    url: url,
                    data: data,
                    method: "GET",
                }).then((r) => this.callback(r, success), error);
        }
        post(url : string,
            data : {},
            success : (data) => void = (d) => {},
            error?: (data) => void) {
                this.$http({
                    url: url,
                    data: data,
                    method: "POST",
                }).then((r) => this.callback(r, success), error);
        }

        constructor(private $http, private $url) {
        }
    }
    phpangularModule.service("AjaxService", AjaxService);
}
