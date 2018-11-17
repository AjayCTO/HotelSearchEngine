using ProductReviews.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ProductReviews.Controllers
{
    public class HotelSearchController : ApiController
    {

        private ProductReviewsContext db = new ProductReviewsContext();
        private GlobalMethods _globalMethods = new GlobalMethods();
        // GET api/hotelsearch

        [ResponseType(typeof(HotelsViewModelList))]
        public IEnumerable<HotelsViewModelList> Post([FromBody]HotelSearchViewmodel model)
        {
            int pageSize = model.PageSize != 0 ? model.PageSize : 10;
            int page = 0;
            var _query = db.Hotels.AsQueryable();

            if (!string.IsNullOrEmpty(model.GlobalSearch))
            {

                _query = _query.Where(x => x.Address.Contains(model.GlobalSearch) || x.HotelType.Contains(model.GlobalSearch) || x.websiteurl.Contains(model.GlobalSearch) || x.Pincode.Contains(model.GlobalSearch) || x.Name.Contains(model.GlobalSearch));

            }
            if (!string.IsNullOrEmpty(model.Address))
            {

                _query = _query.Where(x => x.Address.Contains(model.Address));

            }

            if (!string.IsNullOrEmpty(model.HotelType))
            {
                _query = _query.Where(x => x.HotelType.Contains(model.HotelType));

            }


            if (!string.IsNullOrEmpty(model.Url))
            {
                _query = _query.Where(x => x.websiteurl.Contains(model.Url));

            }

            if (!string.IsNullOrEmpty(model.Pincode))
            {
                _query = _query.Where(x => x.Pincode.Contains(model.Pincode));

            }

            if (!string.IsNullOrEmpty(model.Name))
            {
                _query = _query.Where(x => x.Name.Contains(model.Name));

            }

            _query = _query.Where(x => x.Rooms.Count()>0);
            var _count = _query.Count();

            _query = _query.OrderByDescending(x => x.HotelId);
            var _hotellist = _query.Skip(page).Take(pageSize).ToList();
            var _hotels = new List<HotelsViewModelList>();



            foreach (var p in _hotellist)
            {
                var _newobj = new HotelsViewModelList();
                _newobj.Images = new List<hotelImagesViewModel>();
                _newobj.Rooms = new List<RoomsViewModel>();
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

                if (p.Images != null && p.Images.Count() > 0)
                {
                    foreach (var k in p.Images.ToList())
                    {
                        var _newimage = new hotelImagesViewModel();
                        _newimage.HotelID = k.HotelID;
                        _newimage.ImageData = k.Imagedata;
                        _newobj.Images.Add(_newimage);
                    }
                }


                if (p.Rooms != null && p.Rooms.Count() > 0)
                {
                    foreach (var k in p.Rooms.ToList())
                    {
                        var _newroom = new RoomsViewModel();
                        _newroom.availability = k.availability;
                        _newroom.description = k.description;
                        _newroom.Name = k.Name;
                        _newroom.num_beds = k.num_beds;
                        _newroom.Price = k.Price;
                        _newroom.roomtype = k.roomtype;
                        _newroom.room_floor = k.room_floor;
                        _newroom.room_number = k.room_number;
                        _newroom.RoomID = k.RoomID;
                        _newroom.Images = _globalMethods.GetImages(k.Images);
                        _newobj.Rooms.Add(_newroom);
                    }
                   
                }

                _newobj.TotalCount = _count;
                _hotels.Add(_newobj);

            }
            return _hotels.ToList();
        }


        // GET api/hotelsearch/5
        public string Get(int id)
        {
            return "value";
        }

        //// POST api/hotelsearch

        //[ResponseType(typeof(Hotel))]
        //public IHttpActionResult Post([FromBody]Hotel hotel)
        //{
        //}


        // PUT api/hotelsearch/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/hotelsearch/5
        public void Delete(int id)
        {
        }
    }
}
