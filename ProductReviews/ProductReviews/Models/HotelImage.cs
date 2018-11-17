using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class HotelImage
    {
        [Key]
        public int ImageID { get; set; }

        public int? RoomID { get; set; }
        public int? HotelID { get; set; }

        public byte[] Imagedata { get; set; }
        public string ImageName { get; set; }
        public string ImagePath { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [ForeignKey("RoomID")]
        public virtual Room room     { get; set; }
        [ForeignKey("HotelID")]
        public virtual Hotel hotel { get; set; }
       
    }
}