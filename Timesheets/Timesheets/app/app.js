'use strict';

define(['services/routeResolver'], function () {

    var app = angular.module('timesheetApp', ['routeResolverServices', '$strap']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

        //Change default views and controllers directory using the following:
        //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

        app.register =
        {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

        //$locationProvider.html5Mode(true);

        var route = routeResolverProvider.route;

        $routeProvider
            .when('/timesheets', route.resolve('Timesheets'))
            .when('/timesheet/:timesheetID', route.resolve('Timesheet'))
            .when('/timesheet/:timesheetID/:employeeID/:weekEnding', route.resolve('Timesheet'))
            .when('/employees', route.resolve('Employees'))
            .when('/summaryreport', route.resolve('SummaryReport'))
            .when('/hoursreport', route.resolve('HoursReport'))
            .otherwise({ redirectTo: '/timesheets' });
    }]);

    app.value('$strap.config', {
        datepicker: {
            format: 'mm/dd/yyyy'
        }
    });

    return app;
});
