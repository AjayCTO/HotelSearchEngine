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
    public class BookingController : ApiController
    {
        private ProductReviewsContext db = new ProductReviewsContext();

        // GET api/Booking
        public IQueryable<Booking> GetBooking()
        {
            return db.Booking;
        }

        // GET api/Booking/5
        [ResponseType(typeof(Booking))]
        public IHttpActionResult GetBooking(int id)
        {
            Booking booking = db.Booking.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        // PUT api/Booking/5
        public IHttpActionResult PutBooking(int id, Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != booking.Id)
            {
                return BadRequest();
            }

            db.Entry(booking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Booking
        public Boolean PostBooking(BookingViewmodel model)
        {

            var _returnVar = true;
            var _bookings = db.Booking.ToList();
            foreach (var _item in model.Rooms.ToList())
            {
                var _room = _bookings.Where(x => x.RoomID == _item.RoomID).FirstOrDefault();
                if (_room != null)
                {
                    if (model.date1 >= _room.CheckIn &&   model.date1 <_room.CheckOut)
                    {
                        _item.availability = false;
                    }
                    
                    else if (_room.CheckIn.Ticks > model.date1.Ticks && _room.CheckIn.Ticks < model.date2.Ticks)
                    {
                        
                        _item.availability = false;
                    }

                    else if (_room.CheckOut.Ticks > model.date1.Ticks && _room.CheckOut.Ticks < model.date2.Ticks)
                    {
                        _item.availability = false;
                    } 
                   
                }
                else
                {
                    _item.availability = true;
                }
            }

            foreach(var _data in model.Rooms.ToList())
            {
                if(_data.availability==false)
                {
                    _returnVar = false;
                    break;
                }


            }

            return _returnVar;
        }

        // DELETE api/Booking/5
        [ResponseType(typeof(Booking))]
        public IHttpActionResult DeleteBooking(int id)
        {
            Booking booking = db.Booking.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            db.Booking.Remove(booking);
            db.SaveChanges();

            return Ok(booking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingExists(int id)
        {
            return db.Booking.Count(e => e.Id == id) > 0;
        }
    }
}