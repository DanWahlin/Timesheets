define(['app'], function (app) {
    'use strict';

    app.factory('fileReaderService', function ($q) {
        var fileReaderService = {};

        fileReaderService.readAsDataURL = function(file, scope) {
            var deferred = $q.defer();
            var reader = new FileReader();

            reader.onload = function() {
                var self = this;
                scope.$apply(function () {
                    deferred.resolve(self.result);
                });                
            };

            reader.readAsDataURL(file);
            return deferred.promise;
        };

        return fileReaderService;
    });
});