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
        private readonly string _table = "T_REF_Languages";
        public LanguageAccess()
        { }
        public async Task<List<Language>> GetAll()
        {
            return await base.GetAll<Language>(_table, new List<string> { "*" });
        }
    }
}
