describe('something', function () {
    beforeEach(function () {
        installPromiseMatchers();
    });
    it('should do something', function () {
        var foo = {};
        var bar = {};
        expect(foo).toBeResolvedWith(bar);
        expect(foo).toBeRejectedWith(bar);
        expect(foo).toBeResolved();
        expect(foo).toBeRejected();
    });
});
