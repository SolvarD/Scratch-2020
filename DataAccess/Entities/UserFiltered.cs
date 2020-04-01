using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class UserFiltered: User
    {
        public int Take { get; set; }
        public int Skip { get; set; }
        public string Filter { get; set; }
        public int Total { get; set; }
    }
}
