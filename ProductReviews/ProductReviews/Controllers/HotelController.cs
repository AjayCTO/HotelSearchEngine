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
    public class HotelController : ApiController
    {
        private ProductReviewsContext db = new ProductReviewsContext();

        // GET api/Hotel
      

        public IEnumerable<HotelsViewModel> GetHotels()
        {

            var _hotels = new List<HotelsViewModel>();

            foreach (var p in db.Hotels.ToList())
            {
                var _newobj=new HotelsViewModel();
                _newobj.Images=new List<hotelImagesViewModel>();
                 _newobj.HotelId = p.HotelId;
                _newobj.Name = p.Name;
                _newobj.Description = p.Description;
               _newobj.Address = p.Address;
                _newobj.city = p.city;
                _newobj.Contact = p.Contact;
                _newobj.facebooklink = p.facebooklink;
                _newobj.twitterlink = p.twitterlink;
                _newobj.websiteurl = p.websiteurl;
                _newobj.Pincode = p.Pincode;
                _newobj.Notes = p.Notes;
                _newobj.Latitude = p.Latitude;
                _newobj.longitude = p.longitude;
                
                
                
                _newobj.HotelType = p.HotelType;
                _newobj.instagramlink = p.instagramlink;

                if(p.Rooms!=null && p.Rooms.Count()>0)
                {

                }

                if(p.Images!=null && p.Images.Count()>0)
                {
                    foreach(var k in p.Images.ToList())
                    {
                        var _newimage = new hotelImagesViewModel();
                        _newimage.ImageID = k.ImageID;
                        _newimage.HotelID = k.HotelID;
                        _newimage.ImageData = k.Imagedata;
                        _newobj.Images.Add(_newimage);
                    }
                }

                _hotels.Add(_newobj);
                
            }
            return _hotels.ToList();
        }

        // GET api/Hotel/5
        [ResponseType(typeof(Hotel))]
        public IHttpActionResult GetHotel(int id)
        {
            Hotel hotel = db.Hotels.Find(id);
            if (hotel == null)
            {
                return NotFound();
            }

            return Ok(hotel);
        }

        // PUT api/Hotel/5
        public IHttpActionResult PutHotel(int id, Hotel hotel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hotel.HotelId)
            {
                return BadRequest();
            }

            db.Entry(hotel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelExists(id))
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

        // POST api/Hotel
        [ResponseType(typeof(Hotel))]
        public IHttpActionResult PostHotel([FromBody]Hotel hotel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Hotels.Add(hotel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = hotel.HotelId }, hotel);
        }

        // DELETE api/Hotel/5
        [ResponseType(typeof(Hotel))]
        public IHttpActionResult DeleteHotel(int id)
        {
            Hotel hotel = db.Hotels.Find(id);
            if (hotel == null)
            {
                return NotFound();
            }
            var _hotelimages=db.HotelImages.Where(x=>x.HotelID==id).ToList();
            foreach (var item in _hotelimages)
            {
                    db.HotelImages.Remove(item);  
            }
            db.Hotels.Remove(hotel);
            db.SaveChanges();

            return Ok(hotel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HotelExists(int id)
        {
            return db.Hotels.Count(e => e.HotelId == id) > 0;
        }
    }
}