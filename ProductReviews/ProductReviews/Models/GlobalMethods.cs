using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductReviews.Models
{
    public class GlobalMethods
    {
        private ProductReviewsContext db = new ProductReviewsContext();
        public List<Room> GetHotelRooms(int hotelID) 
        {
            var _rooms = db.Rooms.Where(x => x.HotelID == hotelID).ToList();

                return _rooms;

        }

        public List<RoomImagesViewModel> GetImages(List<HotelImage> Model)
        {
            var _newlist = new List<RoomImagesViewModel>();
            if (Model != null && Model.Count() > 0)
            {
                foreach (var k in Model.ToList())
                {
                    var _newimage = new RoomImagesViewModel();
                    _newimage.ImageID = k.ImageID;
                    _newimage.RoomID = k.RoomID;
                    _newimage.ImageData = k.Imagedata;
                    _newlist.Add(_newimage);
                }
            }
            return _newlist;
        }
    }
}