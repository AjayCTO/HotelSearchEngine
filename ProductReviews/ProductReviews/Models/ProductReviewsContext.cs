using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class ProductReviewsContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public ProductReviewsContext() : base("name=ProductReviewsContext")
        {
        }

        public DbSet<ProductReviews.Models.Product> Products { get; set; }

        public DbSet<ProductReviews.Models.Review> Reviews { get; set; }

        public DbSet<Hotel> Hotels { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<Amenity> Amenities { get; set; }

        public DbSet<HotelImage> HotelImages { get; set; }
        public DbSet<RoomAmenities> RoomAmenities { get; set; }
        public DbSet<RoomAvailability> RoomAvailability { get; set; }

        public DbSet<Booking> Booking { get; set; }
    
    }
}
