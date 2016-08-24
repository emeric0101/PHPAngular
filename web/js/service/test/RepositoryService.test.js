
describe('RepositoryService', function () {
    var repoService;
    beforeEach(module('phpangularModule'));

    it("EntityFromJson", inject(function(RepositoryService) {
        var obj = RepositoryService.EntityFromJson({test: 'coucou'}, 'EntityTestP');
        expect(obj.getTest()).toEqual("coucou");
    }));
    it("EntitiesFromJson", inject(function(RepositoryService) {
        var objs = RepositoryService.EntitiesFromJson([{test: 'coucou'},{test: 'coucou2'}], 'EntityTestP');
        expect(objs[0].getTest()).toEqual("coucou");
        expect(objs[1].getTest()).toEqual("coucou2");
    }));

    it('findAll user', inject(function($httpBackend, RepositoryService) {
           var $scope = {};

           /* Code Under Test */
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

           $httpBackend.flush();
           expect($scope.user[0].getNickname()).toEqual("emeric");
           expect($scope.user[0].getMail()).toEqual("emeric0101@hotmail.fr");

     }));

    it('findById', inject(function($httpBackend, RepositoryService) {
           var $scope = {};

           /* Code Under Test */
           RepositoryService.findById('EntityTest',1, function(EntityTest) {
               $scope.EntityTest = EntityTest;
               $scope.valid = true;
           }, function() {
               $scope.valid = false;
           })

           $httpBackend
             .when('GET', 'Entity/EntityTest/1.json')
             .respond(200, {
                 success: true,
                 EntityTest: {
                     title: "coucou"
                 }
              });
             // Le template home passe quoiqu'il arrive :?
             $httpBackend.whenGET('template/home/home/home.html').respond(200);

           $httpBackend.flush();
           expect($scope.valid).toBe(true);
           expect($scope.EntityTest.getTitle()).toEqual('coucou');

     }));
});
