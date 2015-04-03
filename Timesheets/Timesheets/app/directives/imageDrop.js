
define(['app'], function (app) {
    'use strict';

    app.directive("imageDrop", function ($parse, fileReaderService) {

        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                var expression = attrs["imageDrop"];
                var accesor = $parse(expression);


                var onDragOver = function (e) {
                    e.preventDefault();
                    element.addClass("dragOver");
                };

                var onDragEnd = function (e) {
                    e.preventDefault();
                    element.removeClass("dragOver");
                };

                var placeImage = function (imageData) {

                    scope.$apply(function () {
                        accesor.assign(scope, imageData);
                    });
                };
                
                var resampleImage = function (imageData) {
                    Resample(imageData, 80,80, placeImage);
                };

                var loadFile = function (file) {
                    fileReaderService
                        .readAsDataURL(file, scope)
                        .then(resampleImage);
                };


                element.bind("dragover", onDragOver)
                       .bind("dragleave", onDragEnd)
                       .bind("drop", function (e) {
                           onDragEnd(e);
                           loadFile(e.originalEvent.dataTransfer.files[0]);
                       });

                scope.$watch(expression, function () {
                    element.attr("src", accesor(scope));
                });
            }
        };
    });
});