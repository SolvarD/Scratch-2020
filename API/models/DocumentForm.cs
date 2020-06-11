using DataAccess.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.models
{
    public class DocumentForm
    {
        public int DocumentId { get; set; }       
        public IFormFile Document { get; set; }
    }
}
