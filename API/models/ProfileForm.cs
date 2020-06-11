using DataAccess.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.models
{
    public class ProfileForm
    {
        public int ProfileId { get; set; }
        public bool isPrincipal { get; set; }
        public string Presentation { get; set; }
        public string PastPro { get; set; }
        public string WhyMe { get; set; }
        public string Advantage { get; set; }
        public decimal Price { get; set; }
        public int DocumentId_Photo { get; set; }
        public int DocumentId_CV { get; set; }
        public IFormFile Cv { get; set; }
        public IFormFile Photo { get; set; }
    }
}
