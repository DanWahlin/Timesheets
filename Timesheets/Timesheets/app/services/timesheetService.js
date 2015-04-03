define(['app'], function (app) {
    "use strict";

    app.factory('timesheetService', ['$http', '$q', 'employeesService',
        function ($http, $q, employeesService) {
            var timesheetService = {},
                baseUrl = '/api/timesheets/',
                days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                categories = [{ id: 1, title: 'Planning' }, { id: 2, title: 'Testing' }];
            //timesheets = [
            //    {
            //        id: 1,
            //        rows:
            //        [
            //            {
            //                categoryID: 1,
            //                rowTotal: 25,
            //                dayValues: [
            //                                { day: 'Monday', hours: 5 },
            //                                { day: 'Tuesday', hours: 5 },
            //                                { day: 'Wednesday', hours: 5 },
            //                                { day: 'Thursday', hours: 5 },
            //                                { day: 'Friday', hours: 5 },
            //                                { day: 'Saturday', hours: 0 },
            //                                { day: 'Sunday', hours: 0 }
            //                ]
            //            },
            //            {
            //                categoryID: 2,
            //                rowTotal: 40,
            //                dayValues: [
            //                                { day: 'Monday', hours: 8 },
            //                                { day: 'Tuesday', hours: 8 },
            //                                { day: 'Wednesday', hours: 8 },
            //                                { day: 'Thursday', hours: 8 },
            //                                { day: 'Friday', hours: 8 },
            //                                { day: 'Saturday', hours: 0 },
            //                                { day: 'Sunday', hours: 0 }
            //                ]
            //            }
            //        ]
            //    }
            //];

            timesheetService.get = function (id) {
                return $http.get(baseUrl + id);
            };

            timesheetService.getAll = function () {
                return $http.get(baseUrl);
            };

            timesheetService.getFiltered = function (empID, weekEnding) {
                return $http.get(baseUrl + '?empID=' + empID + '&weekEnding=' + weekEnding);
            };

            timesheetService.getDays = function () {
                return days;
            };

            timesheetService.getCategories = function () {
                return categories;
            };

            timesheetService.getNewTimesheet = function (employeeID, weekEnding) {
                var deferred = $q.defer();

                employeesService.get(employeeID)
                    .success(function (employee) {
                        deferred.resolve({
                            id: 0,
                            employeeID: employeeID,
                            weekEnding: weekEnding,
                            employee: employee,
                            totalHours: 0,
                            rows: [timesheetService.getNewTimesheetRow()]
                        });
                    })
                    .error(function (error) {
                        var message = 'Error getting employee data for new timesheet: ' + error.message;
                        errorService.createErrorAlert($scope, message);
                        deferred.reject(message);
                    });

                return deferred.promise;
            };

            timesheetService.getNewTimesheetRow = function () {
                return {
                    categoryID: null,
                    rowTotal: 0,
                    dayValues: [
                                    { day: 'Monday', hours: 0 },
                                    { day: 'Tuesday', hours: 0 },
                                    { day: 'Wednesday', hours: 0 },
                                    { day: 'Thursday', hours: 0 },
                                    { day: 'Friday', hours: 0 },
                                    { day: 'Saturday', hours: 0 },
                                    { day: 'Sunday', hours: 0 }
                    ]
                };
            };

            timesheetService.save = function (timesheet) {
                if (timesheet.id && timesheet.id > 0) { //update (put)
                    return $http.put(baseUrl + timesheet.id, timesheet);
                }
                else { //insert (post)
                    return $http.post(baseUrl, timesheet);
                }
            };

            timesheetService.delete = function (id) {
                return $http.delete(baseUrl + id);
            }

            timesheetService.datesAreEqual = function(date1, date2) {
                return  date1.getMonth() == date2.getMonth() &&
                        date1.getDate() == date2.getDate() &&
                        date1.getYear() == date2.getYear();
            }

            return timesheetService;
        }]);
});