
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule','angularjs-dropdown-multiselect', 'angular-loading-bar']);

app.config(function ($routeProvider)
{
    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.html"
    });

    $routeProvider.when("/hotel", {
        controller: "hotelController",
        templateUrl: "app/views/hotel.html"
    });

    $routeProvider.when("/rooms", {
        controller: "roomsController",
        templateUrl: "app/views/rooms.html"
    });

    $routeProvider.when("/amenity", {
        controller: "amenityController",
        templateUrl: "app/views/amenity.html"
    });
    $routeProvider.when("/detail", {
        controller: "detailController",
        templateUrl: "app/views/detail.html"
    });

    $routeProvider.when("/booking", {
        controller: "bookingController",
        templateUrl: "app/views/booking.html"
    });
    
    $routeProvider.otherwise({ redirectTo: "/hotel" });

});


var serviceBaseUrl = 'http://localhost:53811/api/';
var serviceBase = 'http://localhost:53811/api/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});


app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


app.factory('log', function () {
    toastr.options = {
        closeButton: true,
        positionClass: 'toast-top-right',
    };
    return {
        success: function (text) {
            toastr.success(text, "Success");
        },
        error: function (text) {
            toastr.error(text, "Error");
        },
        info: function (text) {
            toastr.info(text, "Info");
        },
        warning: function (text) {
            toastr.warning(text, "Warning");
        },
    };
});


 