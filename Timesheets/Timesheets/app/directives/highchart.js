define(['app'], function (app) {
    'use strict';

    app.directive("highchart", function () {

        return {
            restrict: "EA",
            scope: {
              model: "="  
            },
            link: function (scope, element, attrs) {

                scope.$watch("model", function(value) {
                    if (value) {
                        angular.extend(value.chart, { renderTo: element[0] });
                        var chart = new Highcharts.Chart(value);
                    }
                });
            }
        };
    });
});