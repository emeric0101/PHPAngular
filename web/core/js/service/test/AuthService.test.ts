class GroupeTest implements Emeric0101.PHPAngular.Entity.IGroup {
    constructor(private flag) {
        this.flag = flag;
    }
    getFlag() {
        return this.flag;
    }
}
describe('AuthService',function () {
        beforeEach(module('phpangularModule'));
        var $http, $url, $auth;
        beforeEach(inject(function($httpBackend, UrlService, AuthService : Emeric0101.PHPAngular.Service.AuthService) {
            $http = $httpBackend;
            $url = UrlService;
            $auth = AuthService;
        }));

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
        var loginInfoTest = {
            "success": true,
            "user":
                { "id": 1, "mail": "emeric0101@hotmail.fr"}
            };
        var groupeTest = {
            "success": true,
            "Groupe":
                { "id": 1, "flag": "USER"}
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
        it('loadTable', function() {
            $http
            .when('GET', $url.makeApi("auth", "getTable"))
            .respond(200, jsonTest);
            $http.whenGET('template/home/home/home.html').respond(200);
            $auth.getTable();
            $http.flush();
            expect($auth.Table).toEqual(table);
            expect($auth.getRightFromGroupe('test', groupeAdmin)  ).toEqual(true);
            expect($auth.getRightFromGroupe('test', groupeUser)  ).toEqual(false);
            expect($auth.getRightFromGroupe('user-edit-itself', groupeUser)  ).toEqual(true);
            expect($auth.getRightFromGroupe('user-edit', groupeUser)  ).toEqual(false);
            expect($auth.getRightFromGroupe('user-edit', groupeModerator) ).toEqual(true);
            expect($auth.getRightFromGroupe('user-edit-itself', groupeModerator) ).toEqual(true);
            expect($auth.getRightFromGroupe('user-', groupeModerator) ).toEqual(false);
        });

        it('getRight', function(done) {
            $http
            .when('GET', $url.makeApi("auth", "getTable"))
            .respond(200, jsonTest);
            $http.whenGET('template/home/home/home.html').respond(200);
            $auth.getTable();
            $http.flush();

            $http
            .when('GET', $url.makeApi("login", "getLoginInfo"))
            .respond(200, loginInfoTest);

            let testAsync = async () => {
                var result = await $auth.getRight('user-edit-itself');
                expect(result).toEqual(true);
                result = await $auth.getRight('user-edit');
                expect(result).toEqual(false);
                done();
            };
            testAsync();
            $http.flush();
    });
});
