using ProductReviews.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
namespace ProductReviews.Controllers
{
    public class EmailController : ApiController
    {



        [ResponseType(typeof(MailModel))]
        public IHttpActionResult PostEmail([FromBody]MailModel model)
        {

            try
            {
                string body = this.PopulateBody(model);
                this.SendHtmlFormattedEmail(model.Email, "Enquiry", body);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
          
        }
       

        private void SendHtmlFormattedEmail(string recepientEmail, string subject, string body)
        {
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.googlemail.com";
            smtp.Port = 587;
            smtp.EnableSsl = true;

            MailMessage emailData = new MailMessage();

            emailData.To.Add(new MailAddress(recepientEmail));
            emailData.From = new MailAddress("gautam.p@shivamitconsultancy.com", "Hotel Search Engine");
            smtp.Credentials = new System.Net.NetworkCredential("gautam.p@shivamitconsultancy.com", "down2earth");

            emailData.IsBodyHtml = true;
            emailData.Body = body;

            emailData.Subject = subject;

            smtp.Send(emailData);
        }

        private string PopulateBody(MailModel model)
        {
            string body = string.Empty;
            StreamReader reader = new StreamReader(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/EmailTemplate.html"));
            body = reader.ReadToEnd();
            body = body.Replace("{0}", model.Name);
            body = body.Replace("{1}", model.Room);
            body = body.Replace("{2}", model.Price);
            return body;
        }



    }
}
