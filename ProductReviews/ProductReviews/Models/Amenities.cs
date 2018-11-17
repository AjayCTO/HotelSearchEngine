using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class Amenity
    {
        [Key]
        public int AmenityID { get; set; }
        public string Name { get; set; }
        public string value { get; set; }
        public string Notes { get; set; }
    }
}