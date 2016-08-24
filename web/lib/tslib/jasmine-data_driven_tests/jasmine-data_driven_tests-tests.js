all("A data driven test is a suite with multiple specs", ['a', 'b', 'c'], function (value) {
    expect(value).not.toBe('d');
});
all("A data driven test can have many arguments", [
    [1, 2, 3],
    [2, 4, 6]
], function (a, b, c) {
    expect(c - (a + b)).toBe(0);
});
all("A data driven test can be asynchronous", [
    [3, 1],
    [5, 2]
], function (a, b, done) {
    setTimeout(function () {
        expect(a - b > 0).toBe(true);
        done();
    }, 50);
});
xall("A data driven test can be pending", [1, 2, 3], function (value) {
    expect(value < 4).toBe(true);
});
describe("A suite", function () {
    var a;
    beforeEach(function () {
        a = 5;
    });
    all("can contain data driven tests", [1, 2, 3], function (b) {
        expect(a - b > 0).toBe(true);
    });
});
