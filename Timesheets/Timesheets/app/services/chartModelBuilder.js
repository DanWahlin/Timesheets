'use strict';

define(['app'], function (app) {

    app.factory('chartModelBuilder', function () {
      
        var pieChartDefault = {
            chart: {},
            title: {},
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                type: 'pie',               
            }]
        };

        var buildPieChartModel = function(title, data) {
            var model = angular.copy(pieChartDefault);
            model.series[0].data = data;
            model.title.text = title;
            return model;
        };

        return {            
            pieChart: buildPieChartModel
        };
    });
});