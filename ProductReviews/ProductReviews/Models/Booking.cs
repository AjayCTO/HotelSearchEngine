using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int RoomID { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }   
        public string Name { get; set; }
        public string Contact { get; set; }       
        public string TotalPrice { get; set; }
        public string Email { get; set; }
        [ForeignKey("RoomID")]
        public virtual Room room { get; set; }

    }
}