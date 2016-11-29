"use strict";
var promising = function (action) {
    yield action();
};
var itWithPromise = function (expectation, assertion, timeout) {
    it(expectation, promising(assertion), timeout);
};
exports.it = itWithPromise;
var beforeEachWithPromise = function (action, timeout) {
    beforeEach(promising(action), timeout);
};
exports.beforeEach = beforeEachWithPromise;
var afterEachWithPromise = function (action, timeout) {
    afterEach(promising(action), timeout);
};
exports.afterEach = afterEachWithPromise;
var beforeAllWithPromise = function (action, timeout) {
    beforeAll(promising(action), timeout);
};
exports.beforeAll = beforeAllWithPromise;
var afterAllWithPromise = function (action, timeout) {
    afterAll(promising(action), timeout);
};
exports.afterAll = afterAllWithPromise;
var invert = function (promise) {
    return promise.then(function (resolution) { return Promise.reject(new Error("Promise should be rejected, but it is resolved with: " + resolution)); }, function (err) { return err; });
};
exports.invert = invert;
var asyncawait_1 = require("asyncawait");
exports.await = asyncawait_1.await;
