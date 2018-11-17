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
    public class AmenityController : ApiController
    {
        private ProductReviewsContext db = new ProductReviewsContext();

        // GET api/Amenity
        public IQueryable<Amenity> GetAmenities()
        {
            return db.Amenities;
        }

        // GET api/Amenity/5
        [ResponseType(typeof(Amenity))]
        public IHttpActionResult GetAmenity(int id)
        {
            Amenity amenity = db.Amenities.Find(id);
            if (amenity == null)
            {
                return NotFound();
            }

            return Ok(amenity);
        }

        // PUT api/Amenity/5
        public IHttpActionResult PutAmenity(int id, Amenity amenity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != amenity.AmenityID)
            {
                return BadRequest();
            }

            db.Entry(amenity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AmenityExists(id))
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

        // POST api/Amenity
        [ResponseType(typeof(Amenity))]
        public IHttpActionResult PostAmenity([FromBody] Amenity amenity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Amenities.Add(amenity);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = amenity.AmenityID }, amenity);
        }

        // DELETE api/Amenity/5
        [ResponseType(typeof(Amenity))]
        public IHttpActionResult DeleteAmenity(int id)
        {
            Amenity amenity = db.Amenities.Find(id);
            if (amenity == null)
            {
                return NotFound();
            }

            db.Amenities.Remove(amenity);
            db.SaveChanges();

            return Ok(amenity);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AmenityExists(int id)
        {
            return db.Amenities.Count(e => e.AmenityID == id) > 0;
        }
    }
}