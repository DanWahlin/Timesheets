'use strict';

define(['app'], function (app) {

    app.factory('departmentsService', function ($http) {
        var departmentsService = {},
            baseUrl = '/api/departments/ ';

        departmentsService.getAll = function () {
            return $http.get(baseUrl);
        };

        return departmentsService;
    });
});