using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class RoomAvailability
    {
        [Key]
        public int AvailableID { get; set; }


        public int  RoomID { get; set; }

        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public DateTime AvailableDate { get; set; }
        public bool Isavailable { get; set; }


        public string Description { get; set; }

        [ForeignKey("RoomID")]
        public virtual Room room { get; set; }
       
    }
}