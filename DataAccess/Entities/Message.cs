using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class Message
    {
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime time { get; set; }
    }
}
