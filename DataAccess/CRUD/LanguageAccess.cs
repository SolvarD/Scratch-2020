using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class LanguageAccess : DALCRUD
    {
        public LanguageAccess(Requestor requestor) : base(requestor, "T_REF_Languages") 
        { }
        public async Task<List<Language>> GetAll()
        {
            return await base.GetAll<Language>(new List<string> { "*" });
        }
    }
}
