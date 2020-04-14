using DataAccess.CRUD;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IEmailManager
    {
        public void SendTrace(string body);
        public void SendEmail(ContactMessage contact);
    }
    public class EmailManager : IEmailManager
    {
        private readonly TraceAccess _traceAccess;
        private readonly ContactMessageAccess _contactMessageAccess;

        public EmailManager(TraceAccess traceAccess, ContactMessageAccess contactMessageAccess)
        {
            _traceAccess = traceAccess;
            _contactMessageAccess = contactMessageAccess;
        }

        public async void SendTrace(string body)
        {
            string to = "solvar@msn.com";
            string from = "trace@globaldevapp.com";
            MailMessage message = new MailMessage(from, to);
            message.Subject = "Using the new SMTP client.";
            message.Body = body;

            SmtpClient client = new SmtpClient();
            client.Port = 25;
            client.Host = "localhost";
            client.UseDefaultCredentials = true;

            //client.Host = "smtp.globaldevapp.com";
            //var basicCredential = new NetworkCredential("trace@globaldevapp.com", "2");
            //client.UseDefaultCredentials = false;
            //client.Credentials = basicCredential;

            try
            {
                client.Send(message);
                await _traceAccess.Insert(new Trace
                {
                    Created = DateTime.Now,
                    Message = body
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage(): {0}",
                    ex.ToString());
            }
        }
        public async void SendEmail(ContactMessage contact)
        {
            string to = "solvar@msn.com";
            string from = "contact@globaldevapp.com";
            MailMessage message = new MailMessage(from, to);
            message.Subject = "New contact";
            message.Body = contact.Message;

            SmtpClient client = new SmtpClient();
            client.Port = 25;
            client.Host = "localhost";
            client.UseDefaultCredentials = true;

            //client.Host = "smtp.globaldevapp.com";
            //var basicCredential = new NetworkCredential("contact@globaldevapp.com", "3");
            //client.UseDefaultCredentials = false;
            //client.Credentials = basicCredential;

            try
            {
                client.Send(message);
                await _contactMessageAccess.Insert(new ContactMessage
                {
                    Message = contact.Message,
                    Email = contact.Email,
                    FirstName = contact.FirstName,
                    LastName = contact.LastName
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage(): {0}",
                    ex.ToString());
            }

        }
    }
}
