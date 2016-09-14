describe('EntityManager', function () {
    beforeEach(module('phpangularModule'));
    it('persist', inject(function (EntityManager, EntityFactory) {
        var entity = EntityFactory.create("EntityTestP");
        entity.setTest("testUnitaire");
        var $scope = {};
        EntityManager.persist(entity);
        var persistObjs = EntityManager.getPersistObjs();
        var found = false;
        for (var i in persistObjs) {
            if (entity === persistObjs[i]) {
                expect(persistObjs[i].getTest()).toEqual("testUnitaire");
                found = true;
            }
        }
        expect(found).toBe(true);
    }));
    it('flush', inject(function ($httpBackend, EntityManager, UrlService, EntityFactory) {
        var entity = EntityFactory.create("EntityTestP");
        entity.setTest("testUnitaire");
        EntityManager.persist(entity);
        var resultat = false;
        EntityManager.flush(function (result) {
            resultat = result;
        });
        $httpBackend
            .when('POST', UrlService.makeApi("EntityTestP", 'post'))
            .respond(200, {
            success: true,
            "EntityTestP": {
                "id": 42,
                "test": "testUnitaire"
            } });
        $httpBackend.whenGET('template/home/home/home.html').respond(200);
        $httpBackend.flush();
        expect(entity.getTest()).toEqual("testUnitaire");
        expect(entity.getId()).toEqual(42);
        expect(resultat).toBe(true);
    }));
    it('flush bad', inject(function ($httpBackend, EntityManager, UrlService, EntityFactory) {
        var entity = EntityFactory.create("EntityTestP");
        entity.setTest("testUnitaire");
        EntityManager.persist(entity);
        var result = true;
        EntityManager.flush(function (e) {
            result = e;
        });
        $httpBackend
            .when('POST', UrlService.makeApi("EntityTestP", "post"))
            .respond(200, {
            success: false
        });
        $httpBackend.whenGET('template/home/home/home.html').respond(200);
        $httpBackend.flush();
        expect(entity.getTest()).toEqual("testUnitaire");
        expect(result).toBe(false);
    }));
});
