var nvd3_test_ohlcChart;
(function (nvd3_test_ohlcChart) {
    var data = [{
            values: [
                { "date": 15707, "open": 145.11, "high": 146.15, "low": 144.73, "close": 146.06, "volume": 192059000, "adjusted": 144.65 },
                { "date": 15953, "open": 165.85, "high": 166.4, "low": 165.73, "close": 165.96, "volume": 62930500, "adjusted": 165.96 }
            ]
        }];
    nv.addGraph(function () {
        var chart = nv.models.ohlcBarChart()
            .x(function (d) { return d['date']; })
            .y(function (d) { return d['close']; })
            .duration(250)
            .margin({ left: 75, bottom: 50 });
        chart.xAxis
            .axisLabel("Dates")
            .tickFormat(function (d) {
            return d3.time.format('%x')(new Date(new Date().valueOf() - (20000 * 86400000) + (d * 86400000)));
        });
        chart.yAxis
            .axisLabel('Stock Price')
            .tickFormat(function (d, i) { return '$' + d3.format(',.1f')(d); });
        d3.select("#chart1 svg")
            .datum(data)
            .transition().duration(500)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
})(nvd3_test_ohlcChart || (nvd3_test_ohlcChart = {}));
