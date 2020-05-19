using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace DataAccess.CRUD
{
    public class ExperienceAccess : DALCRUD
    {
        public ExperienceAccess(Requestor requestor) : base(requestor, "Experiences")
        { }
        public async Task<List<Experience>> GetAll()
        {
            return await base.GetAll<Experience>(new List<string> { "*" });
        }
    }
}
