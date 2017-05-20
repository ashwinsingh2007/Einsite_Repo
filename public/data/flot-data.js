//Flot Line Chart
var getData = function(){
    debugger;
    var name=$("#options").val();
    flotLine(name);
    
}
var flotLine=function(Name){
    var offset = 0;
    $.get( "/getCompanyDetails", function( data ) {
        var index=0;
        for(var i=0;i<data.length;i++){
            if(data[i].Name === Name){
                index=i;
            }
        }
        var a=[];
        a.push(data[index].LP9);
        a.push(data[index].LP11);
        a.push(data[index].LP13);
        a.push(data[index].LP15);
        a.push(data[index].LP17);
        a.push(data[index].LP19);
        plot(a,offset);
        movLine(a);
    });
}

    var plot=function (a,offset) {
        debugger;
        //var a=[0.7,0.12,0.32,1.2,2.3,3.42];
        var maxG=0;
        var minG=100000;
        for(var i=0;i<a.length;i++){
            if(minG>a[i]){
                minG=a[i];
            }
            if(maxG<a[i]){
                maxG=a[i];
            }
        }
        var flowChartArr = [];
        for (var i = 0; i < 6; i++) {
            flowChartArr.push([a[i], a[i]]);
        }

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            grid: {
                hoverable: true 
            },
            yaxis: {
                min: minG,
                max: maxG+5
            },
            xaxis: {
               mode: "time",
               timeformat: "%y/%m/%d"
            },
            tooltip: true,
            tooltipOpts: {
                content: "'%s' at this time for today is %y.4",
                shifts: {
                    x: 100,
                    y: 5
                }
            }
        };

        var plotObj = $.plot($("#flot-line-chart"), [{
                data: flowChartArr,
                label: " Last Price "
            }],
            options);
    }



//Flot Moving Line Chart

var movLine=function(data) {
    $("#flot-line-chart-moving").html("");
    var container = $("#flot-line-chart-moving");
    var maximum = container.outerWidth() / 2 || 300;
    //
    function getRandomData() {

        if (data.length) {
            data = data.slice(1);
        }

        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }

        // zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    //

    series = [{
        data: getRandomData(),
        lines: {
            fill: true
        }
    }];

    //

    var plot = $.plot(container, series, {
        grid: {
            borderWidth: 1,
            minBorderMargin: 20,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#fff", "#e4f4f4"]
            },
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
            markings: function(axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                    markings.push({
                        xaxis: {
                            from: x,
                            to: x + xaxis.tickSize
                        },
                        color: "rgba(232, 232, 255, 0.2)"
                    });
                }
                return markings;
            }
        },
        xaxis: {
            tickFormatter: function() {
                return "";
            }
        },
        yaxis: {
            min: 0,
            max: 110
        },
        legend: {
            show: true
        }
    });

    // Update the random dataset at 25FPS for a smoothly-animating chart

    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        plot.setData(series);
        plot.draw();
    }, 40);

}

