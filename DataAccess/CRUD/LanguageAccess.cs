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
        public LanguageAccess()
        { }
        public async Task<List<Language>> GetAll()
        {
            return await this.GetAll<Language>();
        }
    }
}
