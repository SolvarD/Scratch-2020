using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class ContactMessage
    {
        public int ContactMessageId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
