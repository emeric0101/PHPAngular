var nvd3_test_donutChart;
(function (nvd3_test_donutChart) {
    var testdata = [
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
    var chart1;
    nv.addGraph(function () {
        var chart1 = nv.models.pieChart()
            .x(function (d) { return d.key; })
            .y(function (d) { return d.y; })
            .donut(true)
            .width(width)
            .height(height)
            .padAngle(.08)
            .cornerRadius(5)
            .id('donut1');
        chart1.title("100%");
        chart1.pie.donutLabelsOutside(true).donut(true);
        d3.select("#test1")
            .datum(testdata)
            .transition().duration(1200)
            .call(chart1);
        return chart1;
    });
    var chart2;
    nv.addGraph(function () {
        var chart2 = nv.models.pieChart()
            .x(function (d) { return d.key; })
            .y(function (d) { return d.y; })
            .color(d3.scale.category20().range().slice(10))
            .width(width)
            .height(height)
            .donut(true)
            .id('donut2')
            .titleOffset(-30)
            .title("woot");
        chart2.pie
            .startAngle(function (d) { return d.startAngle / 2 - Math.PI / 2; })
            .endAngle(function (d) { return d.endAngle / 2 - Math.PI / 2; });
        d3.select("#test2")
            .datum(testdata)
            .transition().duration(1200)
            .call(chart2);
        return chart2;
    });
})(nvd3_test_donutChart || (nvd3_test_donutChart = {}));
