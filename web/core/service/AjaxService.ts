
class DebugEntry {
    public constructor(public nbRequest, public time, public queries) {}
}

export class AjaxService  {
    static $inject = ['$http', 'UrlService'];
    private callback(data: any, success : (data) => void) {
        if (data.data.debug != undefined) {
            console.info(new DebugEntry(data.data.debug.currentQuery, ((data.data.debug.end - data.data.debug.start) * 1000) + ' ms', data.data.debug.queries));
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
