
describe('RepositoryService', function () {
    var repoService;
    beforeEach(module('phpangularModule'));

    it("EntityFromJson", inject(function(RepositoryService) {
        var obj = RepositoryService.EntityFromJson({mail: 'coucou'}, 'User');
        expect(obj.getMail()).toEqual("coucou");
    }));
    it("EntitiesFromJson", inject(function(RepositoryService) {
        var objs = RepositoryService.EntitiesFromJson([{mail: 'coucou'},{mail: 'coucou2'}], 'User');
        expect(objs[0].getMail()).toEqual("coucou");
        expect(objs[1].getMail()).toEqual("coucou2");
    }));

    it('findAll user', inject(function($httpBackend, RepositoryService, $interval) {
           var $scope = {};


           RepositoryService.findAll('User', function(user) {
               $scope.user = user;
           })

           $httpBackend
             .when('GET', 'Entity/User.json')
             .respond(200, {
                 success: true,
                 Users: [{
                    "id": 1,
                    "presentation": "",
                    "address": null,
                    "cp": null,
                    "city": "",
                    "country": 0,
                    "sex": 0,
                    "mail": "emeric0101@hotmail.fr",
                    "created": null,
                    "birthday": null,
                    "score": 0,
                    "nickname": "emeric",
                    "password": null,
                    "avatar": null,
                    "photos": {},
                    "userFriends": {},
                    "pets": {}
             }]
         });
             // Le template home passe quoiqu'il arrive :?
             $httpBackend.whenGET('template/home/home/home.html').respond(200);
             // on doit attendre que l'agglomereur tourne
             $interval(function () {
                 $httpBackend.flush();
                 expect($scope.user[0].getNickname()).toEqual("emeric");
                 expect($scope.user[0].getMail()).toEqual("emeric0101@hotmail.fr");
             }, 1000, 1);


     }));

    it('findById', inject(function($httpBackend, RepositoryService, $interval) {
           var $scope = {};


           RepositoryService.findById('User',1, function(User) {
               $scope.User = User;
               $scope.valid = true;
           }, function() {
               $scope.valid = false;
           })

           $httpBackend
             .when('GET', 'Entity/User/1.json')
             .respond(200, {
                 success: true,
                 Users: {
                    "id": 1,
                    "presentation": "",
                    "address": null,
                    "cp": null,
                    "city": "",
                    "country": 0,
                    "sex": 0,
                    "mail": "coucou",
                    "created": null,
                    "birthday": null,
                    "score": 0,
                    "nickname": "emeric",
                    "password": null,
                    "avatar": null,
                    "photos": {},
                    "userFriends": {},
                    "pets": {}
             }
              });
             // Le template home passe quoiqu'il arrive :?
             $httpBackend.whenGET('template/home/home/home.html').respond(200);
             $interval(function () {
                 $httpBackend.flush();
                 expect($scope.valid).toBe(true);
                 expect($scope.User.getMail()).toEqual('coucou');
                 expect($scope.User.getId()).toEqual(1);
             }, 1000, 1);


     }));
});
