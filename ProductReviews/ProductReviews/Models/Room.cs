using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class Room
    {
        [Key]
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


        [ForeignKey("HotelID")]
        public virtual Hotel hotel { get; set; }
        public virtual List<HotelImage> Images { get; set; }
        public virtual List<RoomAvailability> AvailableDates { get; set; }
    }
}