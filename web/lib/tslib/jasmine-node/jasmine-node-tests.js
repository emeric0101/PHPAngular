"use strict";
it("should have a timeout parameter", function () { }, 1000);
it("should have an optional timeout parameter", function () { });
var jasmine = require("jasmine-node");
jasmine.loadHelpersInFolder("root", /\.helper\.ts/);
jasmine.executeSpecsInFolder({
    specFolders: [],
    onComplete: function (runner) { console.log(runner.results().failedCount); },
    isVerbose: true,
    showColors: true,
    teamcity: false,
    useRequireJs: false,
    regExpSpec: /\.spec\.ts/,
    junitreport: {
        report: false,
        savePath: "./reports/",
        useDotNotation: true,
        consolidate: true
    },
    includeStackTrace: true,
    growl: false
});
