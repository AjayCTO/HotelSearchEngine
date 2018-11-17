'use strict';
app.controller('bookingController', ['$scope', 'localStorageService', 'log', function ($scope, localStorageService, log) {

    $scope.Emailmodel = { FirstName: "", LastName: "", Contact: "", Room: "Single Non Ac", Price: "758 rs", Email: "" }
   
    $scope.BookingModel = { Name:"", Contact: "", Room: {}, TotalPrice: "", Email: "", RoomID: 0, CheckIn: new Date(), CheckOut: new Date() };
    $scope.SelectedRooms = [];
    function GetMonthName(number) {
        switch (number) {
            case 1:
                return "Jan";
                break;
            case 3:
                return "Mar";
                break;
            case 2:
                return "Feb";
                break;
            case 4:
                return "Apr";
                break;
            case 5:
                return "May";
                break;
            case 6:
                return "Jun";
                break;
            case 7:
                return "Jul";
                break;
            case 8:
                return "Aug";
                break;
            case 9:
                return "Sep";
                break;
            case 10:
                return "Oct";
                break;
            case 11:
                return "Nov";
                break;
            case 12:
                return "Dec";
                break;
            default:
                return "";
                break;

        }

    }

    $scope.GetImageData = function (data) {
        data = "data:image/jpeg;base64," + data;
        return data;
    }

    function init() {

        $scope.SelectedRooms = localStorageService.get("SelectedRooms");
        $scope.TotalPrice = localStorageService.get("TotalPrice");
        $scope.currentdetail = localStorageService.get("CurrentDetailObject");
        $scope.TotalDays= localStorageService.get("TotalDays");
        $scope.TotalGuests=localStorageService.get("Guests");
        $scope.TotalRooms=localStorageService.get("Rooms");
         

        
       

        if (localStorageService.get("checkInDate") != null && localStorageService.get("checkInDate") != undefined) {

            var date1 = new Date(localStorageService.get("checkInDate"));
            $scope.CheckInDate = date1.getDate() + ' ' + (GetMonthName(date1.getMonth() + 1)) + ' ' + date1.getFullYear();
        }

        if (localStorageService.get("checkOutDate") != null && localStorageService.get("checkOutDate") != undefined) {
            var date2 = new Date(localStorageService.get("checkOutDate"));
            $scope.CheckOutDate = date2.getDate() + ' ' + (GetMonthName(date2.getMonth() + 1)) + ' ' + date2.getFullYear();
        }

        $scope.Emailmodel.Room = "";
        if ($scope.SelectedRooms != null && $scope.SelectedRooms != undefined) {
            for (var i = 0; i < $scope.SelectedRooms.length; i++) {
                $scope.Emailmodel.Room = $scope.Emailmodel.Room + "," + $scope.SelectedRooms[i].Name;
               // $scope.BookingModel.Room = $scope.SelectedRooms[i];
                $scope.BookingModel.RoomID = $scope.SelectedRooms[i].RoomID;
            }


        }

        $scope.$apply();
    }

    $scope.CheckEmail = function () {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test($scope.Emailmodel.Email);
    }

    $scope.BookDetail = function () {

        $scope.BookingModel.Name= $scope.Emailmodel.FirstName + " " + $scope.Emailmodel.LastName;
        $scope.BookingModel.Email = $scope.Emailmodel.Email;
        $scope.BookingModel.Contact = $scope.Emailmodel.Contact;
        $scope.BookingModel.TotalPrice = $scope.TotalPrice;
        $scope.BookingModel.CheckIn= localStorageService.get("checkInDate");
        $scope.BookingModel.CheckOut =localStorageService.get("checkOutDate");
  
        $.ajax({
            type: "POST",
            data: JSON.stringify($scope.BookingModel),
            url: serviceBaseUrl + "RoomAvailability",
            contentType: "application/json",
            success: function (exists) {
                $scope.sendEmail();
            },
            error: function (error) {
             
                log.error("Some error occurred during operation");

            }
        });
 };
    $scope.sendEmail = function () {

        $("#SendEmail").addClass("disabled");
        $("#SendEmail").html("Sending email..");
        var model = { Name: $scope.Emailmodel.FirstName + " " + $scope.Emailmodel.LastName, Email: $scope.Emailmodel.Email, Contact: $scope.Emailmodel.Contact, Room: $scope.Emailmodel.Room, Price: $scope.TotalPrice }
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),

            url: serviceBaseUrl + "Email",
            contentType: "application/json",
            success: function (exists) {
                $scope.Emailmodel = { FirstName: "", LastName: "", Contact: "", Room: "Single Non Ac", Price: "758 rs", Email: "" }

                $("#modal1").modal('show');

                $("#SendEmail").removeClass("disabled");
                $("#SendEmail").html("Continue to Payment");
            },
            error: function (error) {
                $("#SendEmail").removeClass("disabled");
                $("#SendEmail").html("Continue to Payment");
                log.error("Some error occurred during operation");

            }
        });
    }

    $scope.IsRequired = function () {
        if ($scope.Emailmodel.FirstName == "" || $scope.Emailmodel.Email == "" || $scope.Emailmodel.Contact == "") {
            return false;
        }

        return true;

    }

    init();
}]);