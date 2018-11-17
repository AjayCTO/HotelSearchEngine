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
    $scope.SelectedImageList = [];
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

            url: serviceBaseUrl + "Amenity/",
            contentType: "application/json",
            success: function (rooms) {

                 
                $scope.Amenities = rooms;
                $scope.$apply();
            },
            error: function (error) {
                log.error("into error");

            }
        });

    }

    $scope.assignamenty = function () {
         
        var model =  $scope.roomsamenities ;
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            url: serviceBaseUrl + "RoomAmenities/",
            contentType: "application/json",
            success: function (hotels) {
                 
                log.success("Saved Successfully")
                $("#modal2").modal("hide");
                
            },
            error: function (error) {
                log.error("into error");

            }
        });
    }


    $("#fileName").change(function (event) {
        var files = event.target.files; //FileList object
        var output = document.getElementById("result");

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            //Only pics
            if (!file.type.match('image'))
                continue;

            var picReader = new FileReader();

            picReader.addEventListener("load", function (event) {

                var picFile = event.target;

                var _obj = { RoomID: $scope.RoomID, HotelID: null, Imagedata: picFile.result, ImageName: picFile.name }
                $scope.SelectedImageList.push(_obj);
                $scope.$apply();



            });

            //Read the image
            picReader.readAsDataURL(file);
        }

    });
    function removePaddingCharacters(bytes) {
        bytes = bytes.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");

        return bytes;
    }

    $scope.UploadImages = function () {

        var _toSendImages = angular.copy($scope.SelectedImageList);

        for (var i = 0; i < _toSendImages.length; i++) {

            if (_toSendImages[i].Imagedata != null && _toSendImages[i].Imagedata != undefined) {
                _toSendImages[i].Imagedata = removePaddingCharacters(_toSendImages[i].Imagedata);

            }

        }

        $.ajax({
            type: "POST",
            data: JSON.stringify(_toSendImages),

            url: serviceBaseUrl + "HotelImageUpload",
            contentType: "application/json",
            success: function (exists) {
                $scope.IsCreateMode = false;
                $scope.$apply();
                log.success("Successfully Uploaded");
                $("#modal12").modal('hide');
                $scope.GetRooms();
            },
            error: function (error) {
                log.error("into error");

            }
        });

    }

    $scope.UploadModalOpen = function (obj) {
        $("#file").val("");
        $scope.SelectedImageList = [];
        $scope.Selectedobj = obj;

        $scope.RoomID = obj.RoomID;
        $scope.$apply();
        $("#modal12").modal('show');
    }

   
    $scope.removeImage = function (index) {
        $scope.SelectedImageList.splice(index, 1);
        $scope.$apply();
    }

    $scope.DeleteImage = function (ID) {


        var _isConfirm = confirm("Are you sure you want to delete this Image..??")
        if (_isConfirm) {
            var _img = serviceBaseUrl + "HotelImageUpload" + "/" + ID;

            $.ajax({
                type: "DELETE",
                url: _img,
                contentType: "application/json",
                success: function () {
                    $scope.$apply();
                    log.success("deleted successfully");
                    $scope.GetRooms();
                },
                error: function (error) {
                    log.error("into error")
                }

            });
        }
    }

  
    $scope.OpenModal=function(ID)
    {
         
        $scope.RoomID = ID;
        $scope.GetRoomAmenities(ID);
        $scope.$apply();
        $("#modal2").modal("show");
    }
    $scope.GetImageData = function (data) {
        data = "data:image/jpeg;base64," + data;
        return data;
    }

    $scope.Hotels = [];
    $scope.Rooms = [];
    
    $scope.GetRoomAmenities=function(ID)
    {
        $.ajax({
            type: "GET",

            url: serviceBaseUrl + "RoomAmenities/" + ID,
            contentType: "application/json",
            success: function (hotels) {
                $scope.roomsamenities = hotels;
                $scope.$apply();
            },
            error: function (error) {
                log.error("into error");

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

            url: serviceBaseUrl + "Hotel/",
            contentType: "application/json",
            success: function (hotels) {
                $scope.Hotels = hotels;
                $scope.$apply();
            },
            error: function (error) {
                log.error("into error");

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

                url: serviceBaseUrl+"Rooms/" + ID,
                contentType: "application/json",
                success: function () {
                    $scope.GetRooms();
                    $scope.$apply();
                },
                error: function (error) {
                    log.error("into error");

                }
            });
        }


    }
    $scope.GetRooms = function () {
        $.ajax({
            type: "GET",

            url: serviceBaseUrl+"Rooms",
            contentType: "application/json",
            success: function (rooms) {
                $scope.Rooms = rooms;
                $scope.$apply();
            },
            error: function (error) {
                log.error("into error");

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

                url: serviceBaseUrl+"Rooms",
                contentType: "application/json",
                success: function (exists) {
                    $scope.IsCreateMode = false;
                    init();
                    $scope.$apply();
                    log.success("New Room has been successfully Added")
                },
                error: function (error) {
                    log.error("into error");

                }
            });
        }

    }

    $scope.Putroom = function () {

        var hotel = angular.copy($scope.roomsData);
        var _url = serviceBaseUrl+"Rooms/" + hotel.RoomID;
         
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
               log.error("into error");

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
