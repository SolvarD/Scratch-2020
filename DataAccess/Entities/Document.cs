using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class Document
    {
        public int DocumentId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public string DocumentBase64 { get; set; }
    }
}
