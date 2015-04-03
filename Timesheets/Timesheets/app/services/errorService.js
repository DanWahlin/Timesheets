define(['app'], function (app) {
    'use strict';

    app.factory('errorService', function ($rootScope) {
        var errorService = {};

        errorService.createErrorAlert = function ($scope, content) {
            if (!$scope.alerts) $scope.alerts = [];
            $scope.alerts.push({
                type: "error",
                title: "Error",
                content: content
            });
        };

        return errorService;
    });
});