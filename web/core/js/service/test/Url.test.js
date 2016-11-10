
describe('UrlService', function () {
    var urlService, location, flash;
    beforeEach(module('phpangularModule'));
    beforeEach(inject(function ($rootScope, $controller, UrlService, $location, FlashmessageService) {
        urlService = UrlService;
        location = $location;
        flash = FlashmessageService
    }));
    it("make", function () {
        expect(urlService.make('test')).toEqual('test');
        expect(urlService.make('test','module')).toEqual('test-module');
        expect(urlService.make('test','module', 5)).toEqual('test-module-5');
        expect(urlService.make('tata','module', 5)).toEqual('tata-module-5');
    });
    it("makeApi", function () {
        expect(urlService.makeApi('test','module')).toEqual('Test/module.json');
        expect(urlService.makeApi('test','module', 5)).toEqual('Test/module/5.json');
        expect(urlService.makeApi('tata','module', 5)).toEqual('Tata/module/5.json');
        expect(urlService.makeApi('tata','module', 5, {test: 4})).toEqual('Tata/module/5.json?test=4');
        expect(urlService.makeApi('tata','module', 5, {test: 4,test2:"tt"})).toEqual('Tata/module/5.json?test=4&test2=tt');
    });
    it("redirect", function() {
        spyOn(location, 'path');
        urlService.redirect('test','redirect', null, 'testmsg', 'class');
        expect(location.path).toHaveBeenCalledWith('test-redirect');
        var flashmsg = flash.getBuffer();
        expect(flashmsg[0].msg).toEqual('testmsg');
        expect(flashmsg[0].type).toEqual('class');
    });
});
