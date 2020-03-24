using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public enum enumMessageType
    {
        Public = 1, Private
    }
    public class Message
    {
        public int MessageId { get; set; }
        public int MessageTypeId { get; set; }
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; }
        public int UserId { get; set; }
        public int ReceiverId { get; set; }
        public string Group { get; set; }
    }
}
