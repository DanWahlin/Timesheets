define(['app'], function (app) {
    'use strict';

    app.register.controller('TimesheetsController', ['$scope', '$location', 'timesheetService', 'employeesService', 'errorService', 
        function ($scope, $location, timesheetService, employeesService, errorService) {

        $scope.timesheets = [];
        $scope.employees = [];
        $scope.filter = {
            employeeID: null,
            weekEnding: null
        };

        init();

        function init() {
            addWatches();

            timesheetService.getAll()
                .success(function (timesheets) {
                    $scope.timesheets = timesheets;
                })
                .error(function () {
                    errorService.createErrorAlert($scope, 'Error getting timesheets');
                });

            employeesService.getAll()
                .success(function (employees) {
                    $scope.employees = employees;
                    //Assign first object if desired $scope.filter = { employeeID: $scope.employees[0].id };
                })
                .error(function () {
                    errorService.createErrorAlert($scope, 'Error getting employees');
                });
        }

        $scope.filterTimesheets = function () {
            var empID = $scope.filter.employeeID;
            var weekEnding = null;
            if ($scope.filter.weekEnding != '' && $scope.filter.weekEnding != null) {
                weekEnding = new Date($scope.filter.weekEnding).toISOString();
            }

            timesheetService.getFiltered(empID, weekEnding)
                .success(function (timesheets) {
                    $scope.timesheets = timesheets;
                })
                .error(function () {
                    errorService.createErrorAlert($scope, 'Error getting filtered timesheets');
                });
        };

        $scope.addNewTimesheet = function () {
            var existingTimesheetID = null;
            var weekEnding = new Date($scope.filter.weekEnding);
            //Ensure timesheet doesn't already exist for employee/weekEnding
            for (var i = 0; i < $scope.timesheets.length; i++) {
                var ts = $scope.timesheets[i];
                var tsWeekEnding = new Date(ts.weekEnding);
                if (ts.employeeID == $scope.filter.employeeID && timesheetService.datesAreEqual(tsWeekEnding, weekEnding)) {
                    alert('An existing timesheet already exists - displaying that timesheet.');
                    existingTimesheetID = ts.id;
                }
            }

            if (existingTimesheetID) {
                $location.path('/timesheet/' + ts.id);
            } else {
                $location.path('/timesheet/0/' + $scope.filter.employeeID + '/' + (weekEnding == null ? '' : weekEnding));
            }
        };

        function addWatches() {

            $scope.$watch('filter.weekEnding', function (weekEnding) {
                if (weekEnding) {
                    var dateWeekEnding = new Date(weekEnding);
                    var currentDay = dateWeekEnding.getDay();
                    if (currentDay > 0) { //They didn't pick Sunday which is our "week ending" day
                        var nextWeekEndingDay = 7 - currentDay;
                        var selectedDate = new Date(dateWeekEnding.valueOf());
                        selectedDate.setDate(selectedDate.getDate() + nextWeekEndingDay);
                        $scope.filter.weekEnding = selectedDate.getMonth() + 1 + '/' + selectedDate.getDate() + '/' + selectedDate.getFullYear();
                    }
                }
            }, true);
        }
        }]);

    return app;
});