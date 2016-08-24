var nvd3_test_timeSeries;
(function (nvd3_test_timeSeries) {
    var data = [{
            values: []
        }];
    var i, x;
    var gap = false;
    var prevVal = 3000;
    var tickCount = 100;
    var probEnterGap = 0.1;
    var probExitGap = 0.2;
    var barTimespan = 30 * 60;
    var startOfTime = 1425096000;
    for (i = 0; i < tickCount; i++) {
        x = startOfTime + i * barTimespan;
        if (!gap) {
            if (Math.random() > probEnterGap) {
                prevVal += (Math.random() - 0.5) * 500;
                if (prevVal <= 0) {
                    prevVal = Math.random() * 100;
                }
                data[0].values.push({ x: x * 1000, y: prevVal });
            }
            else {
                gap = true;
            }
        }
        else {
            if (Math.random() < probExitGap) {
                gap = false;
            }
        }
    }
    var chart;
    var halfBarXMin = data[0].values[0].x - barTimespan / 2 * 1000;
    var halfBarXMax = data[0].values[data[0].values.length - 1].x + barTimespan / 2 * 1000;
    function renderChart(location, meaning) {
        nv.addGraph(function () {
            chart = nv.models.historicalBarChart();
            chart
                .xScale(d3.time.scale())
                .color(['#68c'])
                .forceX([halfBarXMin, halfBarXMax])
                .useInteractiveGuideline(true)
                .margin({ "left": 80, "right": 50, "top": 20, "bottom": 30 })
                .duration(0);
            var tickMultiFormat = d3.time.format.multi([
                ["%-I:%M%p", function (d) { return d.getMinutes(); }],
                ["%-I%p", function (d) { return d.getHours(); }],
                ["%b %-d", function (d) { return d.getDate() != 1; }],
                ["%b %-d", function (d) { return d.getMonth(); }],
                ["%Y", function () { return true; }]
            ]);
            chart.xAxis
                .showMaxMin(false)
                .tickPadding(10)
                .tickFormat(function (d) { return tickMultiFormat(new Date(d)); });
            chart.yAxis
                .showMaxMin(false)
                .tickFormat(d3.format(",.0f"));
            var svgElem = d3.select(location);
            svgElem
                .datum(data)
                .transition()
                .call(chart);
            var tickY2 = chart.yAxis.scale().range()[1];
            var lineElems = svgElem
                .select('.nv-x.nv-axis.nvd3-svg')
                .select('.nvd3.nv-wrap.nv-axis')
                .select('g')
                .selectAll('.tick')
                .data(chart.xScale().ticks())
                .append('line')
                .attr('class', 'x-axis-tick-mark')
                .attr('x2', 0)
                .attr('y1', tickY2 + 4)
                .attr('y2', tickY2)
                .attr('stroke-width', 1);
            var tsFormat = d3.time.format('%b %-d, %Y %I:%M%p');
            var contentGenerator = chart.interactiveLayer.tooltip.contentGenerator();
            var tooltip = chart.interactiveLayer.tooltip;
            tooltip.contentGenerator(function (d) { d.value = d.series[0].data.x; return contentGenerator(d); });
            tooltip.headerFormatter(function (d) { return tsFormat(new Date(d)); });
            var xScale = chart.xScale();
            var xPixelFirstBar = xScale(data[0].values[0].x);
            var xPixelSecondBar = xScale(data[0].values[0].x + barTimespan * 1000);
            var barWidth = xPixelSecondBar - xPixelFirstBar;
            function fixBarWidths(barSpacingFraction) {
                svgElem
                    .selectAll('.nv-bars')
                    .selectAll('rect')
                    .attr('width', (1 - barSpacingFraction) * barWidth)
                    .attr('transform', function (d, i) {
                    var deltaX = xScale(data[0].values[i].x) - xPixelFirstBar;
                    deltaX += barSpacingFraction / 2 * barWidth;
                    return 'translate(' + deltaX + ', 0)';
                });
            }
            function shiftXAxis() {
                var xAxisElem = svgElem.select('.nv-axis.nv-x');
                var transform = xAxisElem.attr('transform');
                var xShift = -barWidth / 2;
                transform = transform.replace('0,', xShift + ',');
                xAxisElem.attr('transform', transform);
            }
            if (meaning === 'instant') {
                fixBarWidths(0.2);
            }
            else if (meaning === 'timespan') {
                fixBarWidths(0.0);
                shiftXAxis();
            }
            return chart;
        });
    }
    renderChart('#test1', 'instant');
    renderChart('#test2', 'timespan');
    window.setTimeout(function () {
        window.setTimeout(function () {
            document.getElementById('sc-one').style.display = 'block';
            document.getElementById('sc-two').style.display = 'none';
        }, 0);
    }, 0);
    function switchChartStyle(style) {
        if (style === 'instant') {
            document.getElementById('sc-one').style.display = 'block';
            document.getElementById('sc-two').style.display = 'none';
        }
        else if (style === 'timespan') {
            document.getElementById('sc-one').style.display = 'none';
            document.getElementById('sc-two').style.display = 'block';
        }
    }
})(nvd3_test_timeSeries || (nvd3_test_timeSeries = {}));
