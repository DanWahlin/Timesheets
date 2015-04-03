define(['app'], function (app) {
    'use strict';

    var fakeData = [
        { hours: 40, category: "Testing", department: "Engineering" },
        { hours: 60, category: "Coding", department: "Engineering" },
        { hours: 40, category: "Sales", department: "Marketing" },
        { hours: 30, category: "Recruiting", department: "HR " },
        { hours: 20, category: "Orientation", department: "HR " },
    ];

    var reduceForGraph = function(items, key) {
        return [key, _.reduce(items, function (memo, item) { return memo + item.hours; }, 0)];
    };

    app.register.controller('SummaryReportController', function ($scope, chartModelBuilder, timesheetService, employeesService) {

        $scope.summaryData = fakeData;

        $scope.hoursByCategory =
            _.chain($scope.summaryData)
                .groupBy("category")
                .map(reduceForGraph)
                .value();

        $scope.pieData = chartModelBuilder.pieChart("Hours By Category", $scope.hoursByCategory);        
    });
});