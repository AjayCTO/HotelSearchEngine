'use strict';
app.controller('amenityController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', 'log', function ($scope, localStorageService, $location, authService, ngAuthSettings, log) {

    $scope.amenityData = {
        AmenityID: 0,
        Name: '',
        value: '',
        Notes: ''
      

    };

    

    $scope.amenities = [];
    
    $scope.ResetObj = function () {
        $scope.amenityData = {
            AmenityID: 0,
            Name: '',
            value: '',
            Notes: ''


        };
    }

    
    $scope.CancelForm = function () {
        $scope.IsCreateMode = false;
        $scope.$apply();
    }
   
    $scope.IsCreateMode = false;

    $scope.EditAmenity = function (obj) {
        $scope.IsCreateMode = true;
        $scope.amenityData = obj;
        $scope.$apply();

    }

    $scope.DeleteAmenity = function (ID) {
        var _isConfirm = confirm("Are you sure you want to delete?");
        if (_isConfirm) {
            $.ajax({
                type: "DELETE",

                url: serviceBaseUrl + "Amenity/" + ID,
                contentType: "application/json",
                success: function () {
                    $scope.GetAmenities();
                    $scope.$apply();
                },
                error: function (error) {
                    log.error("into error");

                }
            });
        }


    }
    $scope.GetAmenities = function () {
        $.ajax({
            type: "GET",

            url: serviceBaseUrl + "Amenity/",
            contentType: "application/json",
            success: function (rooms) {

                 
                $scope.amenities = rooms;
                $scope.$apply();
            },
            error: function (error) {
                log.error("into error");

            }
        });

    }
    function init() {
        $scope.GetAmenities();
    }


    init();
    $scope.OpenCreate = function () {

        $scope.ResetObj();
        $scope.IsCreateMode = true;
        $scope.$apply();
    }

    $scope.AddAmenity = function () {
        var room = angular.copy($scope.amenityData);

        if (room.AmenityID != 0) {
            $scope.Putamenity();
        }
        else {


            $.ajax({
                type: "POST",
                data: JSON.stringify(room),

                url: serviceBaseUrl + "Amenity/",
                contentType: "application/json",
                success: function (exists) {
                    $scope.IsCreateMode = false;
                    $scope.GetAmenities();
                    $scope.$apply();
                },
                error: function (error) {
                    log.error("into error");

                }
            });
        }

    }

    $scope.Putamenity = function () {

        var hotel = angular.copy($scope.amenityData);
        var _url = serviceBaseUrl + "Amenity/" + hotel.AmenityID;
        $.ajax({
            type: "PUT",
            data: JSON.stringify(hotel),

            url: _url,
            contentType: "application/json",
            success: function (exists) {
                log.success("into success");
                $scope.IsCreateMode = false;
                $scope.$apply();
            },
            error: function (error) {
                log.success("into error");

            }
        });

    }
    $scope.IsRequired = function () {
        if ($scope.amenityData.Name == "") {
            return false;
        }

        return true;

    }
   
}]);
