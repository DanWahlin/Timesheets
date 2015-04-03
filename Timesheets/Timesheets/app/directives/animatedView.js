/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/angular.js" />
define(['app'], function (app) {
    'use strict';
    /*
        <animated-view data-animations="{duration: 350, viewEnterAnimation: 'slideLeft', viewExitAnimation: 'fadeOut', slideAmount: 50}"></animated-view>
        This is a modified version of the standared ng:view directive. It adds animation capabilities as different views are loaded.
    
        Instead of <ng:view></ng:view> you can use the following to load your views with animations. 
        Only fadeOut, slideLeft, and slideRight animations are currently built-in (that's all I needed for the current project).
    
        <animated-view data-animations="{duration: 350, viewEnterAnimation: 'slideLeft', viewExitAnimation: 'fadeOut', slideAmount: 50}"></animated-view>
    
        The animations attribute is optional since defaults are provided in the directive. 
        Make sure you inject the name of the directive module into your app to use it. For example:
    
        var timesheetApp = angular.module('timesheetApp', ['timesheetApp.directives']);
    
        Since the animations move things left or right I added a CSS class named "view" onto a wrapper div that wraps all views:
    
        <div class="view">
            View content goes here
        </div>
    
        .view {
            left: 0px;
            position:relative;
            opacity: 0.0;
        }
    */

    app.register.directive('animatedView', ['$route', '$anchorScroll', '$compile', '$controller',
        function ($route, $anchorScroll, $compile, $controller) {
            return {
                restrict: 'ECA',
                terminal: true,
                link: function (scope, element, attr) {
                    var lastScope,
                        onloadExp = attr.onload || '',
                        defaults = { duration: 350, viewEnterAnimation: 'slideLeft', viewExitAnimation: 'fadeOut', slideAmount: 50, disabled: false },
                        locals,
                        template,
                        options = scope.$eval(attr.animations);

                    angular.extend(defaults, options);

                    scope.$on('$routeChangeSuccess', update);
                    update();

                    function destroyLastScope() {
                        if (lastScope) {
                            lastScope.$destroy();
                            lastScope = null;
                        }
                    }

                    function clearContent() {
                        element.html('');
                        destroyLastScope();
                    }

                    function update() {
                        locals = $route.current && $route.current.locals;
                        template = locals && locals.$template;

                        if (template) {
                            if (!defaults.disabled) {
                                if (element.children().length > 0) { //Have content in view
                                    animate(defaults.viewExitAnimation);
                                }
                                else { //No content in view so treat it as an enter animation
                                    animateEnterView(defaults.viewEnterAnimation);
                                }
                            }
                            else {
                                bindElement();
                            }

                        } else {
                            clearContent();
                        }
                    }

                    function animateEnterView(animation) {
                        $(element).css('display', 'block');
                        bindElement();
                        animate(animation);
                    }

                    function animate(animationType) {
                        switch (animationType) {
                            case 'fadeOut':
                                $(element.children()).animate({
                                    opacity: 0.0,
                                }, defaults.duration, function () {
                                    animateEnterView('slideLeft');
                                });
                                break;
                            case 'slideLeft':
                                $(element.children()).animate({
                                    left: '-=' + defaults.slideAmount,
                                    opacity: 1.0
                                }, defaults.duration);
                                break;
                            case 'slideRight':
                                $(element.children()).animate({
                                    left: '+=' + defaults.slideAmount,
                                    opacity: 1.0
                                }, defaults.duration);
                                break;
                        }
                    }

                    function bindElement() {
                        element.html(template);
                        destroyLastScope();

                        var link = $compile(element.contents()),
                            current = $route.current,
                            controller;

                        lastScope = current.scope = scope.$new();
                        if (current.controller) {
                            locals.$scope = lastScope;
                            controller = $controller(current.controller, locals);
                            element.children().data('$ngControllerController', controller);
                        }

                        link(lastScope);
                        lastScope.$emit('$viewContentLoaded');
                        lastScope.$eval(onloadExp);

                        // $anchorScroll might listen on event...
                        $anchorScroll();
                    }


                }
            };
        }]);
});