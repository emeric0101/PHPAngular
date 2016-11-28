var GroupeTest = (function () {
    function GroupeTest(flag) {
        this.flag = flag;
        this.flag = flag;
    }
    GroupeTest.prototype.getFlag = function () {
        return this.flag;
    };
    return GroupeTest;
}());
describe('AuthService', function () {
    beforeEach(module('phpangularModule'));
    var jsonTest = {
        "success": true,
        "authTable": {
            "MODERATOR": {
                "user-edit": true,
                "USER": "P"
            },
            "USER": {
                "user-edit-itself": true
            }
        }
    };
    var userRight = new Emeric0101.PHPAngular.Service.RightGroup('USER');
    userRight.addRight(new Emeric0101.PHPAngular.Service.Right('user-edit-itself'));
    var moderatorRight = new Emeric0101.PHPAngular.Service.RightGroup('MODERATOR');
    moderatorRight.addRight(new Emeric0101.PHPAngular.Service.Right('user-edit'));
    moderatorRight.addRight(userRight);
    var table = {
        'MODERATOR': moderatorRight,
        'USER': userRight
    };
    var groupeAdmin = new GroupeTest("ADMIN");
    var groupeUser = new GroupeTest("USER");
    var groupeModerator = new GroupeTest("MODERATOR");
    it('persist', inject(function ($httpBackend, UrlService, AuthService) {
        $httpBackend
            .when('GET', UrlService.makeApi("auth", "getTable"))
            .respond(200, jsonTest);
        $httpBackend.whenGET('template/home/home/home.html').respond(200);
        AuthService.getTable();
        $httpBackend.flush();
        expect(AuthService.Table).toEqual(table);
        expect(AuthService.getRightFromGroupe('test', groupeAdmin)).toEqual(true);
        expect(AuthService.getRightFromGroupe('test', groupeUser)).toEqual(false);
        expect(AuthService.getRightFromGroupe('user-edit-itself', groupeUser)).toEqual(true);
        expect(AuthService.getRightFromGroupe('user-edit', groupeUser)).toEqual(false);
        expect(AuthService.getRightFromGroupe('user-edit', groupeModerator)).toEqual(true);
        expect(AuthService.getRightFromGroupe('user-edit-itself', groupeModerator)).toEqual(true);
        expect(AuthService.getRightFromGroupe('user-', groupeModerator)).toEqual(false);
    }));
});
