var numberFormat = d3.format(".2f");

var caChart = dc.bubbleOverlay("#ca-chart")
    .svg(d3.select("#ca-chart svg"));

// var raChart = dc.bubbleOverlay("#ra-chart")
//     .svg(d3.select("#ra-chart svg"));


var genderChart = dc.pieChart('#gender-chart');
var diseaseRowChart = dc.rowChart('#disease-row-chart');

var nationChart = dc.pieChart('#nation-chart');
var ageChart = dc.barChart('#age-chart');

var liveChart = dc.barChart("#live-chart");
var moneyChart = dc.barChart("#money-chart");

var phyChart = dc.barChart("#phy-chart");
var psyChart = dc.barChart("#psy-chart");
var sameDiseaseChart = dc.pieChart('#sameDisease-chart');

var careChart = dc.barChart("#care-chart");

//var sickAgeChart = dc.rowChart('#sick-age-chart');

var reasonChart = dc.pieChart('#reason-chart');
var EmploymentChart = dc.rowChart('#employment-chart');




// function isGD(v) {
//     return v.type === "广东省";
// }
d3.csv('rare1.csv').then(function(data) {


    //var all = ndx.groupAll();

    var ndx = crossfilter(data);

    var gender = ndx.dimension(function(d) {
        return d.Q3_病友的性别;
    });

    // Produce counts records in the dimension
    var genderGroup = gender.group();

    var nation = ndx.dimension(function(d) {
        return d.Q4_病友的民族;
    });

    // Produce counts records in the dimension
    var nationGroup = nation.group();


    var age = ndx.dimension(function(d) {
        return (2020 - d.Q5_病友的出生年份是);
    });
    var ageGroup = age.group();

    var live = ndx.dimension(function(d) {
        return d.Q17_自理;
    });
    var liveGroup = live.group();


    var money = ndx.dimension(function(d) {
        return d.Q87_病友家的经济状况;
    });
    var moneyGroup = money.group();

    var phy = ndx.dimension(function(d) {
        return d.Q126_生理领域生活质量;
    });
    var phyGroup = phy.group();

    var psy = ndx.dimension(function(d) {
        return d.Q126_心理领域生活质量;
    });
    var psyGroup = psy.group();

    var id = ndx.dimension(function(d) {
        return d.id;
    });

    var care = ndx.dimension(function(d) {

        return d.Q44_药物是否纳入医保

    });
    var careGroup = care.group().reduceCount(),
        nonEmptycareGroup = remove_bins(careGroup);



    function remove_bins(careGroup) { // (source_group, bins...}
        return {
            all: function() {
                return careGroup.all().filter(function(d) {
                    return d.key != "";
                });
            }
        };
    }




    // disease
    var disease = ndx.dimension(function(d) {
        return d.Q22_罕见病的名称;
    });
    var diseaseGroup = disease.group();

    var sameDisease = ndx.dimension(function(d) {
        return d.Q81_同样的罕见病;
    });
    var sameDiseaseGroup = sameDisease.group();


    var cities = ndx.dimension(function(d) {
        return d.Q7_病友的户籍所在地是;
    });
    var citiesGroup = cities.group();

    caChart.width(450)
        .height(450)
        .dimension(cities)
        .group(citiesGroup)


    .elasticRadius(d3.scaleLinear().domain([0, 400]).range([0, 10]))
        //  .elasticRadius(d3.scaleLinear().domain([0, 40]).range([0, 1]))
        .maxBubbleRelativeSize(0.2)

    .r(d3.scaleLinear().domain([0, 400]))
        //   .colors(["#ff7373", "#ff4040", "#ff0000", "#bf3030", "#a60000"])
        .colors(["#ff7373", "#ff4040", "#ff0000", "#bf3030", "#a60000"])
        .colorDomain([13, 30])


    .title(function(d) {
            return "City: " + d.key +
                "\nTotal number of patients: " + d.value;
        })
        //   .labelWidth(5)



    .point("广东省", 1360, 1350)
        .point("广西壮族自治区", 1200, 1350)
        .point("海南省", 1230, 1550)
        .point("浙江省", 1570, 1100)
        .point("福建省", 1520, 1230)
        .point("湖南省", 1280, 1200)

    .point("四川省", 950, 1050)
        .point("云南省", 920, 1330)
        .point("贵州省", 1100, 1230)
        .point("重庆市", 1150, 1100)
        .point("湖北省", 1300, 1050)
        .point("安徽省", 1470, 1000)
        .point("上海市", 1620, 1000)
        .point("江西省", 1420, 1200)
        .point("江苏省", 1550, 950)
        .point("山东省", 1470, 800)
        .point("河南省", 1340, 900)
        .point("山西省", 1270, 770)
        .point("内蒙古自治区", 1270, 570)
        .point("河北省", 1370, 700)
        .point("北京市", 1400, 650)
        .point("陕西省", 1170, 900)
        .point("宁夏回族自治区", 1070, 790)
        .point("甘肃省", 1000, 830)
        .point("青海省", 800, 800)

    .point("天津市", 1440, 680)
        .point("辽宁省", 1600, 550)
        .point("吉林省", 1700, 450)
        .point("黑龙江省", 1750, 300)
        .point("西藏自治区", 450, 950)
        .point("新疆维吾尔自治区", 400, 570)

    .point("澳门", -1, -1)
        .point("香港", -1, -1)






    // raChart.width(450)
    //     .height(450)
    //     .dimension(cities)
    //     .group(citiesGroup)


    // .elasticRadius(d3.scaleLinear().domain([0, 400]).range([0, 10]))

    //     .maxBubbleRelativeSize(0.2)

    // .r(d3.scaleLinear().domain([0, 400]))

    //     .colors(["#ff7373", "#ff4040", "#ff0000", "#bf3030", "#a60000"])
    //     .colorDomain([13, 30])


    // .title(function(d) {
    //         return "City: " + d.key +
    //             "\nTotal number of patients: " + d.value;
    //     })

    // .point("广东省", 1360, 1350)
    //     .point("广西壮族自治区", 1200, 1350)
    //     .point("海南省", 1230, 1550)
    //     .point("浙江省", 1570, 1100)
    //     .point("福建省", 1520, 1230)
    //     .point("湖南省", 1280, 1200)

    // .point("四川省", 950, 1050)
    //     .point("云南省", 920, 1330)
    //     .point("贵州省", 1100, 1230)
    //     .point("重庆市", 1150, 1100)
    //     .point("湖北省", 1300, 1050)
    //     .point("安徽省", 1470, 1000)
    //     .point("上海市", 1620, 1000)
    //     .point("江西省", 1420, 1200)
    //     .point("江苏省", 1550, 950)
    //     .point("山东省", 1470, 800)
    //     .point("河南省", 1340, 900)
    //     .point("山西省", 1270, 770)
    //     .point("内蒙古自治区", 1270, 570)
    //     .point("河北省", 1370, 700)
    //     .point("北京市", 1400, 650)
    //     .point("陕西省", 1170, 900)
    //     .point("宁夏回族自治区", 1070, 790)
    //     .point("甘肃省", 1000, 830)
    //     .point("青海省", 800, 800)

    // .point("天津市", 1440, 680)
    //     .point("辽宁省", 1600, 550)
    //     .point("吉林省", 1700, 450)
    //     .point("黑龙江省", 1750, 300)
    //     .point("西藏自治区", 450, 950)
    //     .point("新疆维吾尔自治区", 400, 570)

    // .point("澳门", 5, 5)
    //     .point("香港", 1, 0)


    // .debug(false);

    ageChart /* dc.barChart('#volume-month-chart', 'chartGroup') */
        .width(420)
        .height(200)
        .margins({ top: 10, right: 50, bottom: 30, left: 40 })
        .dimension(age)
        .group(ageGroup)
        .elasticY(true)
        .centerBar(true)
        // (_optional_) set gap between bars manually in px, `default=2`
        .gap(1)
        .x(d3.scaleLinear().domain([0, 70]))
        .renderHorizontalGridLines(true)
        // Customize the filter displayed in the control span
        .filterPrinter(function(filters) {
            var filter = filters[0],
                s = '';
            s += numberFormat(filter[0]) + ' -> ' + numberFormat(filter[1]);
            return s;
        });

    genderChart /* dc.pieChart('#gender-chart', 'chartGroup') */
    // (_optional_) define chart width, `default = 200`
        .width(250)
        // (optional) define chart height, `default = 200`
        .height(250)
        // Define pie radius
        .radius(80)
        // Set dimension
        .dimension(gender)
        // Set group
        .group(genderGroup)
        .renderLabel(true)
        .legend(dc.legend().x(10).legendText(function(d) { return d.name + " " + d.data; }));


    nationChart
        .width(250)
        .height(250)
        // Define pie radius
        .radius(80)
        // Set dimension
        .dimension(nation)
        // Set group
        .group(nationGroup)
        .renderLabel(true)
        .legend(dc.legend().x(10).legendText(function(d) { return d.name + " " + d.data; }));

    sameDiseaseChart
        .width(270)
        .height(250)
        // Define pie radius
        .radius(80)
        // Set dimension
        .dimension(sameDisease)
        // Set group
        .group(sameDiseaseGroup)
        .renderLabel(true)
        .legend(dc.legend().x(10).legendText(function(d) { return d.name + " " + d.data; }))

    diseaseRowChart /* dc.rowChart('#employment-chart', 'chartGroup') */
        .width(1000)
        .height(2000)
        .margins({ top: 20, left: 20, right: 10, bottom: 20 })
        .group(diseaseGroup)
        .dimension(disease)
        // Assign colors to each value in the x scale domain
        .colors('#006bb3')
        // .ordinalColors(['#006bb3', '#007acc', '#008ae6', '#0099ff', '#1aa3ff', '#33adff', '#4db8ff', '#66c2ff', '#80ccff'])

    .label(function(d) {
            return d.key;
        })
        // Title sets the row text
        .elasticX(true)
        .xAxis().ticks(4);


    liveChart /* dc.rowChart('#employment-chart', 'chartGroup') */
        .width(270)
        .height(200)

    // .x(d3.scaleBand())
    // .xUnits(dc.units.ordinal)
    .x(d3.scaleOrdinal().domain(['totally can', 'totally cannot', 'partly can', 'almost can']))
        .xUnits(dc.units.ordinal)
        .brushOn(true)
        .yAxisLabel("No. of patients")
        .xAxisLabel("able to live by oneself")
        .dimension(live)
        .group(liveGroup)

    .label(function(d) {
            return d.key;
        })
        // .legend(dc.legend().x(350).legendText(function(d) { return d.name + " cannot "; }))

    liveChart.render();

    careChart /* dc.rowChart('#employment-chart', 'chartGroup') */
        .width(450)
        .height(300)

    // .x(d3.scaleBand())
    // .xUnits(dc.units.ordinal)
    .x(d3.scaleOrdinal().domain(['no idea', 'not cover', 'cover more than 75%', 'cover 50-75%', 'cover 25-50%', 'cover 0-25%']))
        .xUnits(dc.units.ordinal)
        .brushOn(true)
        .yAxisLabel("No. of patients")
        .xAxisLabel("medical insurance")
        .dimension(care)
        .group(nonEmptycareGroup)

    .label(function(d) {
            return d.key;
        })
        // .legend(dc.legend().x(350).legendText(function(d) { return d.name + " cannot "; }))


    careChart.render();

    moneyChart /* dc.rowChart('#employment-chart', 'chartGroup') */
        .width(400)
        .height(200)

    // .x(d3.scaleBand())
    // .xUnits(dc.units.ordinal)
    .x(d3.scaleOrdinal().domain(['far below average', 'below average', 'average', 'above average', 'far above average']))
        .xUnits(dc.units.ordinal)
        .brushOn(true)
        .yAxisLabel("No. of patients")
        .xAxisLabel("finance situtaion")
        .dimension(money)
        .group(moneyGroup)

    .label(function(d) {
            return d.key;
        })
        // .legend(dc.legend().x(350).legendText(function(d) { return d.name + " cannot "; }))

    moneyChart.render();


    phyChart /* dc.rowChart('#employment-chart', 'chartGroup') */
        .width(470)
        .height(400)

    // .x(d3.scaleBand())
    // .xUnits(dc.units.ordinal)
    .x(d3.scaleOrdinal().domain(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']))
        .xUnits(dc.units.ordinal)
        .brushOn(true)
        .yAxisLabel("No. of patients")
        .xAxisLabel("phyical health")
        .dimension(phy)
        .group(phyGroup)

    .label(function(d) {
            return d.key;
        })
        // .legend(dc.legend().x(350).legendText(function(d) { return d.name + " cannot "; }))

    .on('renderlet', function(chart) {
        var extra_data = [{ x: 210, y: -10 }, { x: 210, y: 410 }];
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .curve(d3.curveLinear);
        var chartBody = chart.select('g.chart-body');
        var path = chartBody.selectAll('path.extra').data([extra_data]);
        path = path
            .enter()
            .append('path')
            .attr('class', 'extra')
            .attr('stroke', 'red')
            .attr('id', 'extra-line')
            .merge(path);
        path.attr('d', line);

        // and perhaps you'd like to label it?
        var text = chartBody.selectAll('text.extra-label').data([0]);
        text.enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .append('textPath')
            .attr('class', 'extra-label')
            .attr('xlink:href', '#extra-line')
            .attr('startOffset', '50%')
            .text('average score of physical health');
    });

    phyChart.render();

    psyChart /* dc.rowChart('#employment-chart', 'chartGroup') */
        .width(470)
        .height(400)

    .x(d3.scaleOrdinal().domain(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']))
        .xUnits(dc.units.ordinal)
        .brushOn(true)
        .yAxisLabel("No. of patients")
        .xAxisLabel("psy health")
        .dimension(psy)
        .group(psyGroup)

    .label(function(d) {
        return d.key;
    })

    .on('renderlet', function(chart) {

        var extra_data = [{ x: 200, y: -10 }, { x: 200, y: 410 }];
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .curve(d3.curveLinear);
        var chartBody = chart.select('g.chart-body');
        var path = chartBody.selectAll('path.extra').data([extra_data]);
        path = path
            .enter()
            .append('path')
            .attr('class', 'extra')
            .attr('stroke', 'red')
            .attr('id', 'extra-line')
            .merge(path);
        path.attr('d', line);
        path.attr('d', line);
        var text = chartBody.selectAll('text.extra-label').data([0]);

        text.enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .append('textPath')
            .attr('class', 'extra-label')
            .attr('xlink:href', '#extra-line')
            .attr('startOffset', '50%')

        .text('average score of psychology health');


    });
    psyChart.render();

    dc.renderAll();
});