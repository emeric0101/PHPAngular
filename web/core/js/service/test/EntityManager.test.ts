
describe('EntityManager', function () {
    beforeEach(module('phpangularModule'));
    it('persist', inject(function(EntityManager, RepositoryService) {
        var entity = RepositoryService.createEntity("User");
        entity.setMail("testUnitaire");
           var $scope = {};
           EntityManager.persist(entity);
           var persistObjs = EntityManager.getPersistObjs();
           var found = false;
           for (var i in persistObjs) {
               if (entity === persistObjs[i]) {
                   expect(persistObjs[i].getMail()).toEqual("testUnitaire");
                   found = true;
               }
           }
           expect(found).toBe(true);
     }));

     it('flush', inject(function($httpBackend, EntityManager, UrlService, RepositoryService) {
         var entity = RepositoryService.createEntity("User");
         entity.setMail("testUnitaire");
        EntityManager.persist(entity);
        var resultat = false;
        EntityManager.flush(function(result) {
            resultat = result;
        });
        $httpBackend
        .when('POST', UrlService.makeApi("User", 'post'))
        .respond(200, {
          success: true,
          "User": {
             "id": 42,
             "mail": "testUnitaire"
        }});
        $httpBackend
        .when('POST', UrlService.makeApi("Groupe", 'post'))
        .respond(200, {
          success: true,
          "Group": {
             "id": 1,
        }});
        $httpBackend.whenGET('template/home/home/home.html').respond(200);

        $httpBackend.flush();
         expect(entity.getMail()).toEqual("testUnitaire");
         expect(entity.getId()).toEqual(42);
         expect(resultat).toBe(true);
     }));

     it('flush bad', inject(function($httpBackend, EntityManager, UrlService, RepositoryService) {
         var entity = RepositoryService.createEntity("User");
         entity.setMail("testUnitaire");
        EntityManager.persist(entity);
        var result = true;
        EntityManager.flush(function(e) {
            result= e;
        });
        $httpBackend
        .when('POST', UrlService.makeApi("User", "post"))
        .respond(200, {
            success: false
        });
        $httpBackend
        .when('POST', UrlService.makeApi("Groupe", 'post'))
        .respond(200, {
          success: true,
          "Group": {
             "id": 1,
        }});
        $httpBackend.whenGET('template/home/home/home.html').respond(200);

        $httpBackend.flush();
         expect(entity.getMail()).toEqual("testUnitaire");
         expect(result).toBe(false);
     }));


});
