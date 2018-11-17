using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class RoomsViewModel
    {
        public int RoomID { get; set; }
        public string Name { get; set; }
        public int HotelID { get; set; }

        public string roomtype { get; set; }
        public string description { get; set; }
        public int Price { get; set; }
        public int num_beds { get; set; }
        public bool availability { get; set; }
        public string room_floor { get; set; }
        public string room_number { get; set; }
        public List<RoomImagesViewModel> Images { get; set; }
    }
    public class HotelsViewModelList
    {
        public int HotelId { get; set; }

        public string Name { get; set; }

        public string Latitude { get; set; }

        public string longitude { get; set; }
        public string HotelType { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }

        public string city { get; set; }
        public string Pincode { get; set; }
        public string facebooklink { get; set; }
        public string twitterlink { get; set; }
        public string instagramlink { get; set; }
        public string websiteurl { get; set; }

        public List<RoomsViewModel> Rooms { get; set; }
        public List<hotelImagesViewModel> Images { get; set; }

        public string Description { get; set; }

        public string Contact { get; set; }

        public int TotalCount { get; set; }
    }

    public class HotelsViewModel
    {
        public int HotelId { get; set; }

        public string Name { get; set; }

        public string Latitude { get; set; }

        public string longitude { get; set; }
        public string HotelType { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }

        public string city { get; set; }
        public string Pincode { get; set; }
        public string facebooklink { get; set; }
        public string twitterlink { get; set; }
        public string instagramlink { get; set; }
        public string websiteurl { get; set; }


        public List<hotelImagesViewModel> Images { get; set; }

        public string Description { get; set; }

        public string Contact { get; set; }
    }
    public class RoomAmentiesViewModel
    {
        public int RoomAmenitiyID { get; set; }
        public int AmenityID { get; set; }
        public int RoomID { get; set; }
    }
    public class hotelImagesViewModel
    {
        public int? ImageID { get; set; }
        public int? HotelID { get; set; }
        public byte[] ImageData { get; set; }
    }
    public class RoomImagesViewModel
    {
        public int? ImageID { get; set; }
        public int? RoomID { get; set; }
        public byte[] ImageData { get; set; }
    }
    public class HotelSearchViewmodel
    {
        public string Name { get; set; }

        public string GlobalSearch { get; set; }
        public string HotelType { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string Url { get; set; }
        public int PageSize { get; set; }


    }

    public class BookingViewmodel
    {
        public DateTime date1 { get; set; }
        public DateTime date2 { get; set; }
        public List<RoomsViewModel> Rooms { get; set; }
    }
}
