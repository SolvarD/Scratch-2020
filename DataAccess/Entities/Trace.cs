using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class Trace
    {
        public int TraceId { get; set; }
        public DateTime Created { get; set; }
        public string Message { get; set; }
    }
}
