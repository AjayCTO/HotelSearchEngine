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
    public class RoomsController : ApiController
    {
        private ProductReviewsContext db = new ProductReviewsContext();
        private GlobalMethods _globalMethods = new GlobalMethods();
        // GET api/Rooms
        public IEnumerable<RoomsViewModel> GetRooms()
        {
            var _list=new List<RoomsViewModel>();
            foreach (var p in db.Rooms.ToList())
            {
                var _x = new RoomsViewModel
             {
                 Images = _globalMethods.GetImages(p.Images),
                 RoomID = p.RoomID,
                 Name = p.Name,
                 HotelID = p.HotelID,
                 roomtype = p.roomtype,
                 room_number = p.room_number,
                 room_floor = p.room_floor,
                 availability = p.availability,
                 description = p.description,
                 num_beds = p.num_beds

             };

                _list.Add(_x);
            }

            return _list;

        }

      

        // GET api/Rooms/5
        [ResponseType(typeof(Room))]
        public IHttpActionResult GetRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        // PUT api/Rooms/5
        public IHttpActionResult PutRoom(int id, Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != room.RoomID)
            {
                return BadRequest();
            }

            db.Entry(room).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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

        // POST api/Rooms
        [ResponseType(typeof(Room))]
        public IHttpActionResult PostRoom([FromBody]Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rooms.Add(room);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = room.RoomID }, room);
        }

        // DELETE api/Rooms/5
        [ResponseType(typeof(Room))]
        public IHttpActionResult DeleteRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            db.Rooms.Remove(room);
            db.SaveChanges();

            return Ok(room);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomExists(int id)
        {
            return db.Rooms.Count(e => e.RoomID == id) > 0;
        }
    }
}