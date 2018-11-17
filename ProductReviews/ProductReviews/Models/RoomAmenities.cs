using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class RoomAmenities
    {
        [Key]
        public int RoomAmenitiyID { get; set; }
        public int AmenityID { get; set; }
        public int RoomID { get; set; }

        [ForeignKey("RoomID")]
        public virtual Room room { get; set; }
        [ForeignKey("AmenityID")]
        public virtual Amenity amenity { get; set; }
    }
}