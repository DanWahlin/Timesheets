define(['app'], function (app) {
    "use strict";

    app.register.controller('TimesheetController', ['$scope', '$routeParams', '$location', 'timesheetService', 'errorService',
        function ($scope, $routeParams, $location, timesheetService, errorService) {
            var timesheetID = $routeParams.timesheetID;
            var employeeID = $routeParams.employeeID;
            var weekEnding = $routeParams.weekEnding;
            if (weekEnding) weekEnding = new Date(weekEnding.replace(/-/g, '/'));

            $scope.days = timesheetService.getDays();
            $scope.categories = timesheetService.getCategories();
            $scope.timesheet = {};
            $scope.dayTotals = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
            $scope.grandTotal = 0;
            $scope.modal = {
                headerText: 'Delete Timesheet',
                content: 'Are you sure you want to delete this timesheet?',
                buttonText: 'Delete Timesheet',
                callback: function () {
                    $scope.deleteTimesheet();
                }
            };

            //Following will work but will be called multiple times due to digest changes.
            //Went with an ng-change on the textboxes to minimize the calculations performed
            //$scope.$watch('timesheet', function (timesheet) {
            //    angular.forEach(timesheet.rows, function (row) {
            //        row.rowTotal = $scope.calcRowTotal(row);
            //    });
            //}, true);


            init();

            function init() {
                if (timesheetID == 0) { //Add new
                    timesheetService.getNewTimesheet(employeeID, weekEnding)
                        .then(function (timesheet) {
                            $scope.timesheet = timesheet;
                        },
                        function (message) {
                            errorService.createErrorAlert($scope, message);
                        });
                } else {
                    timesheetService.get(timesheetID)
                        .success(function (timesheet) {
                            $scope.timesheet = timesheet;
                            $scope.updateDayTotals();
                            $scope.grandTotal = $scope.calcGrandTotal();
                        })
                        .error(function (error) {
                            errorService.createErrorAlert($scope, 'Error getting timesheet: ' + error.message);
                        });
                }
            }

            $scope.isCategorySelected = function (rowCategoryID, categoryID) {
                return rowCategoryID === categoryID;
            };

            $scope.updateTotals = function (row, index) {
                //Update rowTotal
                row.rowTotal = $scope.calcRowTotal(row);
                //Update dayTotal
                var day = $scope.days[index];
                $scope.dayTotals[day] = $scope.calcDayTotal(day, index);
                //Update grandTotal
                $scope.grandTotal = $scope.calcGrandTotal();
                $scope.timesheet.totalHours = $scope.grandTotal;
            };

            $scope.calcRowTotal = function (row) {
                var total = 0;
                for (var i = 0; i < row.dayValues.length; i++) {
                    var num = parseFloat(row.dayValues[i].hours);
                    if (isNaN(num)) {
                        num = 0;
                    }
                    total += num;
                }
                return total;
            };

            $scope.updateDayTotals = function () {
                for (var i = 0; i < $scope.days.length; i++) {
                    var dayTotal = $scope.calcDayTotal($scope.days[i], i);
                    $scope.dayTotals[$scope.days[i]] = dayTotal;
                }
            };

            $scope.calcDayTotal = function (dayString, index) {
                var dayTotal = 0;
                var rows = $scope.timesheet.rows;
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    for (var j = 0; j < row.dayValues.length; j++) {
                        var dayObj = row.dayValues[j];
                        if (j === index) {
                            var num = parseFloat(dayObj.hours);
                            if (!isNaN(num)) {
                                dayTotal += num;
                            }
                            break;
                        }
                    }
                }
                return dayTotal;
            };

            $scope.calcGrandTotal = function () {
                var total = 0;
                for (var i = 0; i < $scope.timesheet.rows.length; i++) {
                    total += $scope.timesheet.rows[i].rowTotal;
                }
                return total;
            };

            $scope.deleteTimesheet = function () {
                timesheetService.delete($scope.timesheet.id)
                    .success(function (opStatus) {
                        if (opStatus.status) {
                            $location.path('/timesheets');
                        }
                        else {
                            //set error info
                        }
                    })
                    .error(function (error) {
                        errorService.createErrorAlert($scope, 'Error deleting timesheet: ' + error.message);
                    });
            };

            $scope.saveTimesheet = function () {
                timesheetService.save($scope.timesheet)
                    .success(function (opStatus) {
                        alert(opStatus.status);                
                    })
                    .error(function (error) {
                        errorService.createErrorAlert($scope, 'Error saving timesheet: ' + error.message);
                    });
            };

            $scope.addRow = function () {
                var newRow = timesheetService.getNewTimesheetRow();
                $scope.timesheet.rows.push(newRow);
            };
        }]);
});