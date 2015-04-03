'use strict';

define(['app'], function (app) {

    app.register.controller('EmployeesController', function EmployeesController($scope, employeesService, departmentsService) {

        $scope.employees = [];
        $scope.departments = [];
        $scope.alerts = [];
        $scope.departments = [];
        $scope.editModal = {
            title: "Edit",
            employee: {}
        };
        
        var createErrorAlert = function (content) {
            $scope.alerts.push({
                type: "error",
                title: "Error",
                content: content
            });
        };

        $scope.prepareToAddEmployee = function () {
            $scope.editModal.title = "New Employee";
            $scope.editModal.employee = {};
        };

        $scope.prepareToEditEmployee = function (employee) {
            $scope.editModal.title = "Edit " + employee.firstName + " " + employee.lastName;
            $scope.editModal.employee = angular.copy(employee);
        };

        $scope.getDepartment = function(id) {
            for (var i = 0; i < $scope.departments.length; i++) {
                if ($scope.departments[i].id == id) {
                    return $scope.departments[i].name;                    
                }
            }
        };

        $scope.update = function (employee) {
            if (!employee.id) {
                employeesService.add(employee)
                    .error(function () {
                        createErrorAlert("Could not create " + employee.firstName + " " + employee.lastName);
                    })
                    .success(function (newEmployee) {
                        $scope.employees.push(newEmployee);
                    });
            }
            else {
                employeesService.update(employee)
                    .error(function() {
                        createErrorAlert("Error updating " + employee.firstName + " " + employee.lastName);
                    })
                    .success(function() {
                        for (var i = 0; i < $scope.employees.length; i++) {
                            if ($scope.employees[i].id == employee.id) {
                                angular.extend($scope.employees[i], employee);
                                break;
                            }
                        }
                    });
            }
        };
      
        $scope.delete = function (employee) {
            employeesService.delete(employee.id)
                .success(function () {
                    for (var i = 0; i < $scope.employees.length; i++) {
                        if ($scope.employees[i].id == employee.id) {
                            $scope.employees.splice(i, 1);
                            break;
                        }
                    }
                })
                .error(function () {
                    createErrorAlert("Error deleting " + employee.firstName + " " + employee.lastName);
                });
        };
        
        departmentsService.getAll().success(function (departments) {
            $scope.departments = departments;
        });

        employeesService.getAll().success(function (employees) {
            $scope.employees = employees;
        });

    });
});