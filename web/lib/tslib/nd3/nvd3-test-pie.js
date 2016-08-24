var nvd3_test_pie;
(function (nvd3_test_pie) {
    var testdata = [
        { key: "One", y: 5 },
        { key: "Two", y: 2 },
        { key: "Three", y: 9 },
        { key: "Four", y: 7 },
        { key: "Five", y: 4 },
        { key: "Six", y: 3 },
        { key: "Seven", y: 0.5 }
    ];
    var width = 300;
    var height = 300;
    nv.addGraph(function () {
        var chart = nv.models.pie()
            .x(function (d) { return d.key; })
            .y(function (d) { return d.y; })
            .width(width)
            .height(height)
            .labelType(function (d, i, values) {
            return values.key + ':' + values.value;
        });
        d3.select("#test1")
            .datum([testdata])
            .transition().duration(1200)
            .attr('width', width)
            .attr('height', height)
            .call(chart);
        return chart;
    });
    nv.addGraph(function () {
        var chart = nv.models.pie()
            .x(function (d) { return d.key; })
            .y(function (d) { return d.y; })
            .width(width)
            .height(height)
            .labelType('percent')
            .valueFormat(d3.format('%'))
            .donut(true);
        d3.select("#test2")
            .datum([testdata])
            .transition().duration(1200)
            .attr('width', width)
            .attr('height', height)
            .call(chart);
        return chart;
    });
})(nvd3_test_pie || (nvd3_test_pie = {}));
