var nvd3_test_scatterChart;
(function (nvd3_test_scatterChart) {
    nv.utils.symbolMap.set('thin-x', function (size) {
        size = Math.sqrt(size);
        return 'M' + (-size / 2) + ',' + (-size / 2) +
            'l' + size + ',' + size +
            'm0,' + -(size) +
            'l' + (-size) + ',' + size;
    });
    var chart;
    nv.addGraph(function () {
        chart = nv.models.scatterChart()
            .showDistX(true)
            .showDistY(true)
            .useVoronoi(true)
            .color(d3.scale.category10().range())
            .duration(300);
        chart.dispatch.on('renderEnd', function () {
            console.log('render complete');
        });
        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));
        d3.select('#test1 svg')
            .datum(randomData(4, 40))
            .call(chart);
        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function (e) { ('New State:', JSON.stringify(e)); });
        return chart;
    });
    function randomData(groups, points) {
        var data = [], shapes = ['thin-x', 'circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'], random = d3.random.normal();
        for (i = 0; i < groups; i++) {
            data.push({
                key: 'Group ' + i,
                values: []
            });
            for (var j = 0; j < points; j++) {
                data[i].values.push({
                    x: random(),
                    y: random(),
                    size: Math.round(Math.random() * 100) / 100,
                    shape: shapes[j % shapes.length]
                });
            }
        }
        return data;
    }
})(nvd3_test_scatterChart || (nvd3_test_scatterChart = {}));
