'use strict';
app.controller('hotelController', ['$scope', 'localStorageService', '$http','$location', 'authService', 'ngAuthSettings','log' ,function ($scope, localStorageService,$http, $location, authService, ngAuthSettings,log) {
    $scope.Hotels = [];
    $scope.hotelData = {
        Name: '',
        Latitude: '',
        longitude: '',
        HotelType: '',
        Notes: '',
        Address: '',
        city: '',
        Pincode: '',
        facebooklink: '',
        twitterlink: '',
        instagramlink: '',
        websiteurl: '',
        Description: '',
        Contact: '',
        HotelId: 0,


    };
    $scope.SelectedImageList = [];
    $scope.ResetObj=function()
    {
        $scope.hotelData = {
            Name: '',
            Latitude: '',
            longitude: '',
            HotelType: '',
            Notes: '',
            Address: '',
            city: '',
            Pincode: '',
            facebooklink: '',
            twitterlink: '',
            instagramlink: '',
            websiteurl: '',
            Description: '',
            Contact: '',
            HotelId: 0,


        };
    }

    $scope.IsCreateMode = false;

    $scope.HotelID=0;

    $scope.EditHotel=function(obj)
    {
        $scope.IsCreateMode = true;
        $scope.hotelData = obj;
        $scope.$apply();

    }

    function removePaddingCharacters(bytes) {
        bytes = bytes.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");

        return bytes;
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

                var _obj = { RoomID: null, HotelID: $scope.HotelID, Imagedata: picFile.result, ImageName: picFile.name }
                $scope.SelectedImageList.push(_obj);
                $scope.$apply();



            });

            //Read the image
            picReader.readAsDataURL(file);
        }
      
    });


    $scope.UploadImages=function()
    {

        var _toSendImages = angular.copy($scope.SelectedImageList);

        for (var i = 0; i < _toSendImages.length; i++) {

            if (_toSendImages[i].Imagedata != null && _toSendImages[i].Imagedata != undefined) {
                _toSendImages[i].Imagedata = removePaddingCharacters(_toSendImages[i].Imagedata);
               
            }

        }
       
        $.ajax({
            type: "POST",
            data: JSON.stringify(_toSendImages),

            url: serviceBaseUrl +"HotelImageUpload",
            contentType: "application/json",
            success: function (exists) {
                $scope.IsCreateMode = false;
                $scope.$apply();
                log.success("Successfully Uploaded").css("width", "300px")
             $("#modal2").modal('hide');
            },
            error: function (error) {
                log.error("into error");

            }
        });
       
    }

    $scope.UploadModalOpen=function(obj)
    {
        $scope.Selectedobj = obj;
        
        $scope.HotelID = obj.HotelId;
        $scope.$apply();
        $("#modal2").modal('show');
    }

    $scope.GetImageData=function(data)
    {
        data = "data:image/jpeg;base64," + data;
        return data;
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
                    log.success("deleted successfully").css("width", "400px")
                    
                },
                error: function (error) {
                    log.error("into error")
                }

            });
        }
    }


    $scope.DeleteHotel = function (ID) {
        
        var _isConfirm = confirm("Are you sure you want to delete.??");
        if (_isConfirm)
        {
            var _dsf = serviceBaseUrl+"Hotel/" + ID;
            $.ajax({
                type: "DELETE",

                url: _dsf,
                
                contentType: "application/json",
               
                success: function () {
                    $scope.Gethotels();
                    
                    $scope.$apply();
                    log.success("deleted successfully").css("width", "400px")
                },
                error: function (error) {
                    log.error("into error");

                }
            });
        }
  }
    $scope.Gethotels = function () {
        
        $.ajax({
            type: "GET",

            url: serviceBaseUrl + "Hotel",
            contentType: "application/json",
            success: function (hotels) {
                $scope.Hotels = hotels;

           
                $scope.$apply();
            },
            error: function (error) {
                log.error("Error");

            }
        });

    }
    function init()
    {
        $scope.Gethotels();
    }
    $scope.CancelForm=function()
    {
        $scope.IsCreateMode = false;
        $scope.$apply();
    }

    init();
    $scope.OpenCreate=function()
    {
        $scope.ResetObj();
        $scope.IsCreateMode = true;
        $scope.$apply();
    }
   
    $scope.Addhotel = function () {
        var hotel = angular.copy($scope.hotelData);

        if (hotel.HotelId != 0) {
            $scope.Puthotel();
        }
        else {


            $.ajax({
                type: "POST",
                data: JSON.stringify(hotel),

                url: serviceBaseUrl + "Hotel",
                contentType: "application/json",
                success: function (exists) {
                    $scope.IsCreateMode = false;
                    $scope.$apply();
                },
                error: function (error) {
                    log.error("into error");

                }
            });
        }
     
    }

    $scope.Puthotel = function () {
      
        var hotel = angular.copy($scope.hotelData);

        $.ajax({
            type: "PUT",
            data: JSON.stringify(hotel),

            url: serviceBaseUrl + "Hotel/" + hotel.HotelId,
            contentType: "application/json",
            success: function (exists) {
                log.success("into success");
                $scope.IsCreateMode = false;
                $scope.$apply();
            },
            error: function (error) {
                log.error("into error");

            }
        });

    }
    $scope.IsRequired = function () {
        if ($scope.hotelData.Name == "" || $scope.hotelData.Address == "" || $scope.hotelData.city == "" || $scope.hotelData.Contact == "") {
            return false;
        }

        return true;

    }
}]);
