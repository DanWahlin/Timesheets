'use strict';

define(['app'], function (app) {

    app.factory('employeesService', function ($rootScope, $http) {
        var employeesService = {},
            baseUrl = '/api/employees/ ';

        employeesService.get = function (id) {
            return $http.get(baseUrl + id);
        };

        employeesService.getAll = function () {
            return $http.get(baseUrl);
        };

        employeesService.delete = function (id) {
            return $http.delete(baseUrl + id);
        };

        employeesService.update = function (employee) {
            return $http.put(baseUrl + employee.id, employee);
        };

        employeesService.add = function (employee) {
            return $http.post(baseUrl, employee);
        };

        return employeesService;
    });
});
