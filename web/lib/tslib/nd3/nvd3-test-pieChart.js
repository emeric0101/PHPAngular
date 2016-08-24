var nvd3_test_pieChart;
(function (nvd3_test_pieChart) {
    var testdata = [
        { key: "One", y: 5, color: "#5F5" },
        { key: "Two", y: 2 },
        { key: "Three", y: 9 },
        { key: "Four", y: 7 },
        { key: "Five", y: 4 },
        { key: "Six", y: 3 },
        { key: "Seven", y: 0.5 }
    ];
    var testdata2 = [
        { key: "One", y: 5 },
        { key: "Two", y: 2 },
        { key: "Three", y: 9 },
        { key: "Four", y: 7 },
        { key: "Five", y: 4 },
        { key: "Six", y: 3 },
        { key: "Seven", y: 0.5 }
    ];
    var height = 350;
    var width = 350;
    nv.addGraph(function () {
        var chart = nv.models.pieChart()
            .x(function (d) { return d.key; })
            .y(function (d) { return d.y; })
            .width(width)
            .height(height);
        d3.select("#test1")
            .datum(testdata2)
            .transition().duration(1200)
            .attr('width', width)
            .attr('height', height)
            .call(chart);
        setInterval(function () {
            testdata2[0].y = Math.floor(Math.random() * 10);
            testdata2[1].y = Math.floor(Math.random() * 10);
            chart.update();
        }, 4000);
        return chart;
    });
    nv.addGraph(function () {
        var chart = nv.models.pieChart()
            .x(function (d) { return d.key; })
            .y(function (d) { return d.y; })
            .color(d3.scale.category20().range().slice(8))
            .growOnHover(false)
            .labelType('value')
            .width(width)
            .height(height);
        chart.pie
            .startAngle(function (d) { return d.startAngle / 2 - Math.PI / 2; })
            .endAngle(function (d) { return d.endAngle / 2 - Math.PI / 2; });
        d3.select("#test2")
            .datum(testdata)
            .transition().duration(1200)
            .attr('width', width)
            .attr('height', height)
            .call(chart);
        var is_disabled = false;
        setInterval(function () {
            chart.dispatch['changeState']({ disabled: { 2: !is_disabled, 4: !is_disabled } });
            is_disabled = !is_disabled;
        }, 3000);
        return chart;
    });
})(nvd3_test_pieChart || (nvd3_test_pieChart = {}));
