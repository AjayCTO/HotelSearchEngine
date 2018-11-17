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
    public class HotelImageUploadController : ApiController
    {
        private ProductReviewsContext db = new ProductReviewsContext();

        // GET api/HotelImageUpload
        public IQueryable<HotelImage> GetHotelImages()
        {
            return db.HotelImages;
        }

        // GET api/HotelImageUpload/5
        [ResponseType(typeof(HotelImage))]
        public IHttpActionResult GetHotelImage(int id)
        {
            HotelImage hotelimage = db.HotelImages.Find(id);
            if (hotelimage == null)
            {
                return NotFound();
            }

            return Ok(hotelimage);
        }

        // PUT api/HotelImageUpload/5
        public IHttpActionResult PutHotelImage(int id, HotelImage hotelimage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hotelimage.ImageID)
            {
                return BadRequest();
            }

            db.Entry(hotelimage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotelImageExists(id))
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

        // POST api/HotelImageUpload
        [ResponseType(typeof(List<HotelImage>))]
        public IHttpActionResult PostHotelImage(List<HotelImage> hotelimage)
        {
            try
            {

            
            if (hotelimage != null && hotelimage.Count()>0)
            {
                foreach (var item in hotelimage.ToList())
                {
                    db.HotelImages.Add(item);
                    
                }
            }
            db.SaveChanges();
            return Ok(hotelimage);
            }
            catch (Exception)
            {

                throw;
            }

        }

        // DELETE api/HotelImageUpload/5
        [ResponseType(typeof(HotelImage))]
        public IHttpActionResult DeleteHotelImage(int id)
        {
            HotelImage hotelimage = db.HotelImages.Find(id);
            if (hotelimage == null)
            {
                return NotFound();
            }
        

            db.HotelImages.Remove(hotelimage);
            db.SaveChanges();

            return Ok(hotelimage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HotelImageExists(int id)
        {
            return db.HotelImages.Count(e => e.ImageID == id) > 0;
        }
    }
}