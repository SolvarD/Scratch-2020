using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class Profile
    {
        public int ProfileId { get; set; }
        public bool isPrincipal { get; set; }
        public string Presentation { get; set; }
        public string PastPro { get; set; }
        public string WhyMe { get; set; }
        public string Advantage { get; set; }
        public double Price { get; set; }
        public int DocumentId_Photo { get; set; }
        public int DocumentId_CV { get; set; }
        public Document CV { get; set; }
        public Document Photo { get; set; }
    }
}
