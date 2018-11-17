using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProductReviews.Models;

namespace ProductReviews.Controllers
{
    public class RoomAvailabilityController : ApiController
    {
        private ProductReviewsContext db = new ProductReviewsContext();


        
        // GET api/RoomAvailability/5
        [ResponseType(typeof(RoomAvailability))]
        public IHttpActionResult GetRoomAvailability(int id)
        {
            RoomAvailability roomavailability = db.RoomAvailability.Find(id);
            if (roomavailability == null)
            {
                return NotFound();
            }

            return Ok(roomavailability);
        }

    

        // PUT api/RoomAvailability/5
       
        // POST api/RoomAvailability
        [ResponseType(typeof(RoomAvailability))]
        public IHttpActionResult PostRoomAvailability(Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           
            booking.room = null;
            
            //var hotelid = db.Rooms.Where(x => x.RoomID == booking.RoomID).FirstOrDefault().HotelID;
            //if(booking.room!=null)
            //{
            //    booking.room.HotelID = hotelid;
            //}
            var _newbooking = new Booking();
             _newbooking = booking;

             db.Booking.Add(_newbooking);
            db.SaveChanges();


            return Ok("ok");
        }

        // DELETE api/RoomAvailability/5
        [ResponseType(typeof(RoomAvailability))]
        public IHttpActionResult DeleteRoomAvailability(int id)
        {
            RoomAvailability roomavailability = db.RoomAvailability.Find(id);
            if (roomavailability == null)
            {
                return NotFound();
            }

            db.RoomAvailability.Remove(roomavailability);
            db.SaveChanges();

            return Ok(roomavailability);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomAvailabilityExists(int id)
        {
            return db.RoomAvailability.Count(e => e.AvailableID == id) > 0;
        }
    }
}