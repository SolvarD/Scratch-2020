using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace DataAccess.CRUD
{
    public class ProfileAccess : DALCRUD
    {
        public ProfileAccess(Requestor requestor) : base(requestor, "Profiles")
        { }
        public async Task<List<Profile>> GetAll()
        {
            List<Profile> profiles = await base.GetAll<Profile>(new List<string> { "*" });
            return profiles.OrderBy(g => g.isPrincipal).ToList();
        }
        public async Task<Profile> Insert(Profile item)
        {
            List<string> columns = new List<string> {
                "isPrincipal",
                "Presentation",
                "PastPro",
                "WhyMe",
                "Price",
                "DocumentId_Photo",
                "DocumentId_CV"
            };
            return base.Insert<Profile>(item, columns);
        }
    }
}
