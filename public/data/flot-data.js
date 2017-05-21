//Flot Line Chart
var globalData=null;;
var generatereport = function(){
    var a=[],a1=[],a2=[],a3=[],a4=[];
    var name1=$("#options1").val();
    var name2=$("#options2").val();
    var name3=$("#options3").val();
    var name4=$("#options4").val();
    if(name1=="-1"||name2=="-1"||name3=="-1"||name2=="-1"){
        alert("Please select all values !!")
        return;
    }
    var index1,index2,index3,index4;
    if(globalData==null){
        $.get( "/getCompanyDetails", function( data ) {
            globalData=data;
            for(var i=0;i<globalData.length;i++){
                if(globalData[i].Name === name1){
                    index1=i;
                }
                if(globalData[i].Name === name2){
                    index2=i;
                }
                if(globalData[i].Name === name3){
                    index3=i;
                }
                if(globalData[i].Name === name4){
                    index4=i;
                }
            }
            a.push(globalData[index1].LP9);
            a.push(globalData[index2].LP9);
            a.push(globalData[index3].LP9);
            a.push(globalData[index4].LP9);
            plot(a,0,2);
        });
}
else{
        for(var i=0;i<globalData.length;i++){
        if(globalData[i].Name === name1){
            index1=i;
        }
        if(globalData[i].Name === name2){
            index2=i;
        }
        if(globalData[i].Name === name3){
            index3=i;
        }
        if(globalData[i].Name === name4){
            index4=i;
        }
    }
    a.push(globalData[index1].LP9);
    a.push(globalData[index2].LP9);
    a.push(globalData[index3].LP9);
    a.push(globalData[index4].LP9);
    a1.push(globalData[index1].LP9);
    a1.push(globalData[index1].LP11);
    a1.push(globalData[index1].LP13);
    a1.push(globalData[index1].LP15);
    a1.push(globalData[index1].LP17);
    a1.push(globalData[index1].LP19);
    a2.push(globalData[index2].LP9);
    a2.push(globalData[index2].LP11);
    a2.push(globalData[index2].LP13);
    a2.push(globalData[index2].LP15);
    a2.push(globalData[index2].LP17);
    a2.push(globalData[index2].LP19);
    a3.push(globalData[index3].LP9);
    a3.push(globalData[index3].LP11);
    a3.push(globalData[index3].LP13);
    a3.push(globalData[index3].LP15);
    a3.push(globalData[index3].LP17);
    a3.push(globalData[index3].LP19);
    a4.push(globalData[index4].LP9);
    a4.push(globalData[index4].LP11);
    a4.push(globalData[index4].LP13);
    a4.push(globalData[index4].LP15);
    a4.push(globalData[index4].LP17);
    a4.push(globalData[index4].LP19);
    plot(a,0,0,2,a1,a2,a3,a4,index1,index2,index3,index4);
}


    
}
var getData = function(){
    debugger;
    var name=$("#options").val();
    flotLine(name);
}
var flotLine=function(Name){
    var offset = 0;
    if(globalData==null){
        $.get( "/getCompanyDetails", function( data ) {
            globalData=data;
            for(var i=0;i<globalData.length;i++){
                if(globalData[i].Name === Name){
                    index=i;
                }
            }
            var a=[];
            a.push(globalData[index].LP9);
            a.push(globalData[index].LP11);
            a.push(globalData[index].LP13);
            a.push(globalData[index].LP15);
            a.push(globalData[index].LP17);
            a.push(globalData[index].LP19);
            plot(a,offset,1);
            movLine(a);
        });
    }
    else{
    for(var i=0;i<globalData.length;i++){
        if(globalData[i].Name === Name){
            index=i;
        }
    }
    var a=[];
    a.push(globalData[index].LP9);
    a.push(globalData[index].LP11);
    a.push(globalData[index].LP13);
    a.push(globalData[index].LP15);
    a.push(globalData[index].LP17);
    a.push(globalData[index].LP19);
    plot(a,index,offset,1);
    movLine(a);
    }


}

    var plot=function (a,index,offset,check,a1,a2,a3,a4,index1,index2,index3,index4) {
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
        var flowChartArr1 = [];
        var flowChartArr2 = [];
        var flowChartArr3 = [];
        var flowChartArr4 = [];
        if(check==1 || check==2){
            for (var i = 0; i < 6; i++) {
                flowChartArr.push([i, a[i]]);
            }
        }
        if(check==2){
            for (var i = 0; i < 6; i++) {
                flowChartArr1.push([i, a1[i]]);
                flowChartArr2.push([i, a2[i]]);
                flowChartArr3.push([i, a3[i]]);
                flowChartArr4.push([i, a4[i]]);
            }
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
                min: minG-10,
                max: maxG+10
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
        var plotObj;
        if(check==1){
            plotObj = $.plot($("#flot-line-chart"), [{
                    data: flowChartArr,
                    label: globalData[index].Name
                }],
            options);
        }
        if(check==2){
            plotObj = $.plot($("#flot-line-chart-compare"), [{
                    data: flowChartArr1,
                    label: globalData[index1].Name
                },{
                    data: flowChartArr2,
                    label: globalData[index2].Name
                },{
                    data: flowChartArr3,
                    label: globalData[index3].Name
                },{
                    data: flowChartArr4,
                    label: globalData[index4].Name
                }
                ],
            options);
        }

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

