'use strict';
app.controller('roomsController', ['$scope','localStorageService', '$location', 'authService', 'ngAuthSettings','log', function ($scope,localStorageService, $location, authService, ngAuthSettings,log) {

    $scope.roomsData = {
        RoomID: 0,
        type: '',
        price: '',
        num_beds: '',
        availability: true,
        room_floor: '',
        room_number: '',
        description: '',
        HotelID:0

    };

    $scope.RoomID = 0;

    $scope.removeAmenities = function (amenityID, RoomID) {
        for (var i = 0; i < $scope.roomsamenities.length; i++) {
            if ($scope.roomsamenities[i].RoomID == RoomID && $scope.roomsamenities[i].AmenityID == amenityID) {
                $scope.roomsamenities.splice(i, 1);
                break;
            }

        }
        $scope.$apply();
    }
    $scope.AddAmenities = function (amenityID,RoomID) {
        $scope.roomsamenities.push({ AmenityID: amenityID, RoomID: RoomID });
        $scope.$apply();
    }
    $scope.roomsamenities = [];
    $scope.Amenities = [];
    $scope.CancelForm = function () {
        $scope.IsCreateMode = false;
        $scope.$apply();
    }

    $scope.GetAmenities = function () {
        $.ajax({
            type: "GET",

            url: "http://localhost:53811/api/Amenity/",
            contentType: "application/json",
            success: function (rooms) {

                debugger;
                $scope.Amenities = rooms;
                $scope.$apply();
            },
            error: function (error) {
                alert("into error");

            }
        });

    }

    $scope.assignamenty = function () {
        debugger;
        var model =  $scope.roomsamenities ;
        console.log(model);
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            url: "http://localhost:53811/api/RoomAmenities/",
            contentType: "application/json",
            success: function (hotels) {
                debugger;
                toastr.success("Saved Successfully")
                $("#modal2").modal("hide");
                
            },
            error: function (error) {
                alert("into error");

            }
        });
    }

    
    $scope.OpenModal=function(ID)
    {
        debugger;
        $scope.RoomID = ID;
        $scope.GetRoomAmenities(ID);
        $scope.$apply();
        $("#modal2").modal("show");
    }

    var HotelserviceBaseUrl = serviceBaseUrl + "Hotel/";
    serviceBaseUrl = serviceBaseUrl + "Rooms/";

    $scope.Hotels = [];
    $scope.Rooms = [];
    
    $scope.GetRoomAmenities=function(ID)
    {
        $.ajax({
            type: "GET",

            url: "http://localhost:53811/api/RoomAmenities/" + ID,
            contentType: "application/json",
            success: function (hotels) {
                $scope.roomsamenities = hotels;
                $scope.$apply();
            },
            error: function (error) {
                alert("into error");

            }
        });

    }
    $scope.ResetObj = function () {
        $scope.roomsData = {
            RoomID: 0,
            type: '',
            price: '',
            num_beds: '',
            availability: true,
            room_floor: '',
            room_number: '',
            description: '',
            HotelID: 0

        };
    }

    

    $scope.Gethotels = function () {
        $.ajax({
            type: "GET",

            url: HotelserviceBaseUrl,
            contentType: "application/json",
            success: function (hotels) {
                $scope.Hotels = hotels;
                $scope.$apply();
            },
            error: function (error) {
                alert("into error");

            }
        });

    }
    $scope.IsCreateMode = false;

    $scope.EditRoom = function (obj) {
        $scope.Gethotels();
        $scope.IsCreateMode = true;
        $scope.roomsData = obj;
        $scope.$apply();
      
    }

    $scope.DeleteRoom = function (ID) {
        var _isConfirm = confirm("Are you sure you want to delete?");
        if (_isConfirm) {
            $.ajax({
                type: "DELETE",

                url: serviceBaseUrl + ID,
                contentType: "application/json",
                success: function () {
                    $scope.GetRooms();
                    $scope.$apply();
                },
                error: function (error) {
                    alert("into error");

                }
            });
        }


    }
    $scope.GetRooms = function () {
        $.ajax({
            type: "GET",

            url: serviceBaseUrl,
            contentType: "application/json",
            success: function (rooms) {
                $scope.Rooms = rooms;
                $scope.$apply();
            },
            error: function (error) {
                alert("into error");

            }
        });

    }
    function init() {
        $scope.GetRooms();
        $scope.GetAmenities();
    }

    $scope.GetCurrentRoomStatus=function(amenityID,roomid)
    {

        for (var i = 0; i < $scope.roomsamenities.length; i++) {
            if ($scope.roomsamenities[i].RoomID == roomid && $scope.roomsamenities[i].AmenityID == amenityID)
            {
                return true;
            }

        }
        return false;
    }
    init();
    $scope.OpenCreate = function () {
        $scope.Gethotels();

        $scope.ResetObj();
        $scope.IsCreateMode = true;
        $scope.$apply();
    }

    $scope.AddRoom = function () {
        var room = angular.copy($scope.roomsData);

        if (room.RoomID != 0) {
            $scope.Putroom();
        }
        else {


            $.ajax({
                type: "POST",
                data: JSON.stringify(room),

                url: serviceBaseUrl,
                contentType: "application/json",
                success: function (exists) {
                    $scope.IsCreateMode = false;
                    init();
                    $scope.$apply();
                    toastr.success("New Room has been successfully Added")
                },
                error: function (error) {
                    alert("into error");

                }
            });
        }

    }

    $scope.Putroom = function () {

        var hotel = angular.copy($scope.roomsData);
        var _url = serviceBaseUrl + hotel.RoomID;
        console.log(_url);
        debugger;
        $.ajax({
            type: "PUT",
            data: JSON.stringify(hotel),

            url: _url,
            contentType: "application/json",
            success: function (exists) {
                $scope.IsCreateMode = false;
                init();
                $scope.$apply();
            },
            error: function (error) {
               alert("into error");

            }
        });

    }
 
    $scope.IsRequired = function () {
        if ($scope.roomsData.HotelID == "" || $scope.roomsData.price == "") {
            return false;
        }

        return true;

    }
}]);
