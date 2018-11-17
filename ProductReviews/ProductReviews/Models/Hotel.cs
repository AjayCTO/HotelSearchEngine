using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class Hotel
    {
        [Key]
        public int HotelId { get; set; }

        [Required]
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




        public string Description { get; set; }

        public string Contact { get; set; }

        //Navigation Property
        public virtual  ICollection<Room> Rooms { get; set; }
        public virtual  List<HotelImage> Images { get; set; }
    }
}