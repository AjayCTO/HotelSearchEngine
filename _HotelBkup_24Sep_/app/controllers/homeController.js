'use strict';
app.controller('homeController', ['$scope', 'localStorageService', '$location','log', function ($scope, localStorageService, $location, log) {
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

    var _PageSize = 10;
    var _IsLazyLoadingUnderProgress = 0;
    var _TotalRecordsCurrent = 0;
    $scope.totalrecords = 0;

    function getIncrementor(_Total) {
        if (_Total <= 100) {
            return 10;
        }
        else if (_Total > 100 && _Total < 500) {
            return 20;
        }
        else if (_Total > 500) {
            return 50;
        }
        else {
            return 10;
        }
    }

    $(window).scroll(function () {
        var _SearchValue = $.trim($("#MasterSearch").val());

        if (_IsLazyLoadingUnderProgress === 0 && _TotalRecordsCurrent != 0) {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                if (_PageSize < $scope.totalrecords) {
                    _IsLazyLoadingUnderProgress = 1;
                    _PageSize = _TotalRecordsCurrent + 5;
               
                    $scope.FillHotels();
                }
                else {
                    // log.info("You have already loaded all data.")
                }

            }
        }

    });


    $scope.GoToDetailPage = function (obj) {

        $scope.showloader = true;
        localStorageService.set("CurrentDetailObject", obj);
        $location.path("/detail");
    }

    $scope.showloader = false;

    $scope.SearchObject = { Name: "", HotelType: "", Address: "", URL: "", Pincode: "", GlobalSearch: "", PageSize: _PageSize }

    $scope.GetImageData = function (data) {
        data = "data:image/jpeg;base64," + data;
        return data;
    }

    $scope.HotelList = [];
    $scope.GetTrimmedString = function (_string) {
        if (_string != null && _string != undefined) {
            _string = $.trim(_string);
        }

        return _string != "" ? true : false;
        
    }
    $scope.ResetObj=function()
    {
        $scope.showloader = true;
        $scope.SearchObject = { Name: "", HotelType: "", Address: "", URL: "", Pincode: "", GlobalSearch: "", PageSize: _PageSize }
        $scope.$apply();
        $scope.FillHotels();
    }
   
    $scope.FillHotels=function()
    {
            $scope.SearchObject.PageSize = _PageSize;
            $scope.$apply();
            $scope.showloader = true;
            _IsLazyLoadingUnderProgress = 1;
            $.ajax({
                type: "POST",
                data: JSON.stringify($scope.SearchObject),

                url: serviceBaseUrl+"HotelSearch",
                contentType: "application/json",
                success: function (data) {

                    $scope.showloader = false;

                    $scope.HotelList = data;
                    if ($scope.HotelList != null && $scope.HotelList.length > 0) {
                        _TotalRecordsCurrent = $scope.HotelList.length;
                        $scope.totalrecords = $scope.HotelList[0].TotalCount;
                       
                    }
                    $scope.$apply();
                },
                complete: function () {
                    _IsLazyLoadingUnderProgress = 0;
                },
                error: function (error) {
               alert("into error");

                }
            });
        }
    
    //$scope.patterncheck = function () {
    //    //var pattern = "/^[a-zA-Z0-9]*$/"
    //    var pattern = 0;
    //    if($scope.globalsearch !=null && $scope.globalsearch.match(/^[a-zA-Z0-9]*$/)){
            
    //    }
 

    

    $scope.globalsearch = function ()
    {
        if ($scope.SearchObject.GlobalSearch == null || $.trim($scope.SearchObject.GlobalSearch) == "" || $scope.SearchObject.GlobalSearch.match("/^[a-zA-Z0-9]*$/")) {
          toastr.warning("Please Enter Valid Latters to Search").css("width","400px")
            $("#globalsearch").focus();
        }
        else {
            $scope.FillHotels();
        }

        //$scope.FillHotels();
    }

   
    function init()
    {
        $scope.FillHotels();
       
    }

    init();
}]);