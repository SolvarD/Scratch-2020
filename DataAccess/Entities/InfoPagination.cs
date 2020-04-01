using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class InfoPagination
    {
        public int Take { get; set; }
        public int Skip { get; set; }
        public string Filter { get; set; }
        public int Total { get; set; }
    }
}
