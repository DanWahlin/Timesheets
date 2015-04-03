require.config({
    baseUrl: '/app',

    urlArgs: 'v=1.0'

    // to avoid caching in development
    //urlArgs: 'bust=' + (new Date()).getTime()
    // 
});

require(
    [
        'app',
        'services/routeResolver',
        'controllers/navbarController',
        'services/employeesService',
        'services/errorService',
        'services/timesheetService',
        'services/departmentsService',
        'services/fileReaderService',
        'services/chartModelBuilder',
        'directives/imageDrop',
        'directives/highchart'
    ],
    function () {
        angular.bootstrap(document, ['timesheetApp']);   
});
