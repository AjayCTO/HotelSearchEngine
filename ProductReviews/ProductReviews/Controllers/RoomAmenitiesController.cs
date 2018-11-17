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
    public class RoomAmenitiesController : ApiController
    {
        private ProductReviewsContext db = new ProductReviewsContext();

        // GET api/RoomAmenities
        public IEnumerable<RoomAmentiesViewModel> GetRoomAmenities()
        {
            return db.RoomAmenities.Select(p => new RoomAmentiesViewModel
          {
              RoomAmenitiyID = p.RoomAmenitiyID,
              RoomID = p.RoomID,
              AmenityID = p.AmenityID,

          }).ToList();
        }

        // GET api/RoomAmenities/5
        [ResponseType(typeof(RoomAmenities))]
        public IEnumerable<RoomAmentiesViewModel> GetRoomAmenities(int id)
        {
            var roomamenities = db.RoomAmenities.Where(x => x.RoomID == id).ToList();
            if (roomamenities == null)
            {
                return new List<RoomAmentiesViewModel>();
            }
            return roomamenities.Select(p => new RoomAmentiesViewModel
            {
                RoomAmenitiyID = p.RoomAmenitiyID,
                RoomID = p.RoomID,
                AmenityID = p.AmenityID,

            }).ToList();
        }

        // PUT api/RoomAmenities/5
        public IHttpActionResult PutRoomAmenities(int id, List<RoomAmenities> roomamenities)
        {
            try
            {
                var _roomamenties = db.RoomAmenities.Where(x => x.RoomID == id).ToList();
                if (_roomamenties != null && _roomamenties.Count() > 0)
                {
                    foreach (var _t in _roomamenties)
                    {
                        RoomAmenities _roomamenities1 = db.RoomAmenities.Find(_t.RoomAmenitiyID);
                        if (_roomamenities1 == null)
                        {
                        }
                        else
                        {

                            db.RoomAmenities.Remove(_roomamenities1);
                        }
                    }
                }

                if (roomamenities != null && roomamenities.Count() > 0)
                {
                    foreach (var item in roomamenities.ToList())
                    {
                        db.RoomAmenities.Add(item);


                    }
                }




                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomAmenitiesExists(id))
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

        // POST api/RoomAmenities
      [ResponseType(typeof(RoomAmenities))]
        public IHttpActionResult PostRoomAmenities(List<RoomAmentiesViewModel> roomamenities)
        {
            var id = roomamenities.FirstOrDefault().RoomID;

            try
            {
                var _roomamenties = db.RoomAmenities.Where(x => x.RoomID == id).ToList();
                if (_roomamenties != null && _roomamenties.Count() > 0)
                {
                    foreach (var _t in _roomamenties)
                    {
                        RoomAmenities _roomamenities1 = db.RoomAmenities.Find(_t.RoomAmenitiyID);
                        if (_roomamenities1 == null)
                        {
                        }
                        else
                        {

                            db.RoomAmenities.Remove(_roomamenities1);
                        }
                    }
                }

                if (roomamenities != null && roomamenities.Count() > 0)
                {
                    foreach (var item in roomamenities.ToList())
                    {
                        var _newobj = new RoomAmenities();
                        _newobj.RoomID = item.RoomID;
                        _newobj.AmenityID = item.AmenityID;
                        db.RoomAmenities.Add(_newobj);


                    }
                }




                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE api/RoomAmenities/5
        [ResponseType(typeof(RoomAmenities))]
        public IHttpActionResult DeleteRoomAmenities(int id)
        {
            RoomAmenities roomamenities = db.RoomAmenities.Find(id);
            if (roomamenities == null)
            {
                return NotFound();
            }

            db.RoomAmenities.Remove(roomamenities);
            db.SaveChanges();

            return Ok(roomamenities);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomAmenitiesExists(int id)
        {
            return db.RoomAmenities.Count(e => e.RoomAmenitiyID == id) > 0;
        }
    }
}