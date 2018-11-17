'use strict';
app.controller('detailController', ['$scope', 'localStorageService', 'authService', '$location', 'log', function ($scope, localStorageService, authService, $location, log) {
    $scope.BookingModel = { Name: "", Contact: "", Room: {}, TotalPrice: "", Email: "", RoomID: 0, CheckIn: new Date(), CheckOut: new Date() };
    $scope.Datemodel = {date1: "", date2: "" , Room:{}, RoomID:0}
    $scope.checkinDate="";
    $scope.checkoutDate = "";

    $scope.IsRoomAvailable = true;

    $scope.currentdetail = {};


    $scope.SelectedRooms = [];


    $scope.roomsamenities = [];

    $scope.Amenities = [];

    $scope.currentroomid = 0;
    var diffDays = 0;

    $scope.GetImageData = function (data) {
        data = "data:image/jpeg;base64," + data;
        return data;
    }

  


    $scope.SendTobooking = function () {
        localStorageService.set("checkInDate", $("#firstdate").val());
        localStorageService.set("checkOutDate", $("#seconddate").val());

      //  localStorageService.set("CurrentDetailObject", obj);
        $location.path("/booking");
    }
    $scope.GetTotalPrice = function () {
        var _Price = 0;
        if ($scope.SelectedRooms.length > 0) {

            for (var i = 0; i < $scope.SelectedRooms.length; i++) {
                if ($scope.SelectedRooms[i].Price != null && $scope.SelectedRooms[i].Price != undefined) {
                    var _roomPrice = parseFloat($scope.SelectedRooms[i].Price);
                    _Price = _Price + _roomPrice;

                   
                }
            }
        }

        return _Price;
    }

    //$scope.TotalPrices = function () {
    //    var _totalprice = 0;
    //    var _price = $scope.GetTotalPrice(_Price);
    //    var _days = $scope.dayDiff(diffDays);

    //    _totalprice = $scope.GetTotalPrice() * diffDays;
    //    debugger;
    //    return _totalprice;
    //}



   

    $scope.Cheakindate = function (firstDate) {
        $("#firstdate").val();
     }
    $scope.Cheakoutdate = function (secondDate) {
        $scope("#seconddate").val();
     }

    $scope.dayDiff = function () {
        var firstDate = $("#firstdate").val();
        var secondDate = $("#seconddate").val();
        if (secondDate != "" && firstDate != "") {
            var date2 = new Date($scope.formatString(secondDate));
            var date1 = new Date($scope.formatString(firstDate));
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            
             diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
             debugger;
            
        }
        
    }

    $scope.formatString = function (format) {
        var day = parseInt(format.substring(0, 2));
        var month = parseInt(format.substring(3, 5));
        var year = parseInt(format.substring(6, 10));
        var date = new Date(year, month - 1, day);
        return date;
        debugger;
    }


    $scope.ChooseRoom = function (room) {
       // $scope.SelectedRooms = [];

        if ($scope.SelectedRooms.length > 0) {

            for (var i = 0; i < $scope.SelectedRooms.length; i++) {
                if ($scope.SelectedRooms[i].RoomID != room.RoomID) {
                    $scope.SelectedRooms.push(room);
                    break;
                }
                else {
                    log.warning("Already Selected");
                    break;
                }
            }
        }
        else {
            $scope.SelectedRooms.push(room);
         
        }
        $scope.currentroomid = room.RoomID;
        $scope.selectedroomamenities(room.RoomID);



        localStorageService.set("SelectedRooms", $scope.SelectedRooms);
        localStorageService.set("TotalPrice", $scope.GetTotalPrice());
        localStorageService.set("checkInDate", $("#firstdate").val());
        localStorageService.set("checkOutDate", $("#seconddate").val());

        $scope.$apply();

    }




    $scope.GetAmenities = function () {
        $.ajax({
            type: "GET",

            url: "http://localhost:53811/api/Amenity/",
            contentType: "application/json",
            success: function (rooms) {
             

                $scope.Amenities = rooms;
                $scope.$apply();
            },
            error: function (error) {
                alert("into error");

            }
        });

    }

    $scope.selectedroomamenities = function (ID) {

        $.ajax({
            type: "GET",
            url: "http://localhost:53811/api/RoomAmenities/" + ID,
            contentType: "application/json",
            success: function (Amenities) {

                $scope.roomsamenities = Amenities;
               
                $scope.$apply();

            },
            error: function (error) {
                alert("into error");

            }
        });

    }


    $scope.GetAvailableRoomStatus=function()
    {
        $scope.checkinDate = $("#firstdate").val();
        $scope.checkoutDate = $("#seconddate").val();
        
        $scope.Datemodel.date1 = $scope.checkinDate;
        $scope.Datemodel.date2 = $scope.checkoutDate;
        $scope.Datemodel.Rooms = $scope.SelectedRooms;
        console.log($scope.Datemodel);
        if ($scope.checkinDate != null && $scope.checkoutDate != null && $scope.SelectedRooms.length > 0 && $scope.checkoutDate != undefined && $scope.checkinDate != undefined)

        {
            if ($.trim($scope.checkinDate) != "" && $.trim($scope.checkoutDate) != "") {

                $.ajax({
                    type: "POST",
                    data: JSON.stringify($scope.Datemodel),
                    url: "http://localhost:53811/api/Booking",
                    contentType: "application/json",
                    success: function (exists) {
                        
                        $scope.IsRoomAvailable = exists;
                        $scope.$apply();
                    },
                    error: function (error) {
                        alert("into error");

                    }
                });
            }

        }
    }


    $scope.GetCurrentRoomStatus = function (amenityID, roomid) {

        for (var i = 0; i < $scope.roomsamenities.length; i++) {
            if ($scope.roomsamenities[i].RoomID == roomid && $scope.roomsamenities[i].AmenityID == amenityID) {
                return true;
            }

        }
        return false;
    }

    $scope.GoTohomePage = function (obj) {

        $scope.showloader = true;

        $location.path("/home");

    }

    function init() {
        $scope.currentdetail = localStorageService.get("CurrentDetailObject");
        debugger;
        $scope.GetAmenities();
        //$("#firstdate").val("");
        //$("#seconddate").val("");
    }
    init()

}]);