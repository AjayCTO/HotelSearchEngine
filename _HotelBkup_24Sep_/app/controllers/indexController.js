'use strict';
app.controller('indexController', ['$scope', 'localStorageService', 'authService', '$location', 'log', function ($scope, localStorageService, authService, $location, log) {
   
    $scope.logOut = function () {
        
        authService.logOut();
        $location.path('/hotel');
    }

    $scope.isadmin = false;


    $scope.$on('$locationChangeStart', function (event) {

        var _path = $location.path();

      

        if (_path == "/hotel" || _path == "/rooms" || _path == "/amenity") {

            $scope.isadmin = true;

        }

        else {
            $scope.isadmin = false;
        }

     
      
    });



}]);