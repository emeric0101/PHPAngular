describe('EntityFactory', function () {
    var repoService;
    beforeEach(module('phpangularModule'));
    it('create entity', inject(function ($httpBackend, EntityFactory, $http) {
        var $scope = {};
        var entity = EntityFactory.create("EntityTest");
        expect(entity.getTitle()).toEqual("");
        entity.setTitle("test");
        expect(entity.getTitle()).toEqual("test");
    }));
});
