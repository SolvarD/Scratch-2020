using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public interface IDictionaryAccess
    {
        Task<List<DictionaryLanguage>> GetById(int id);
    }
    public class DictionaryAccess : DALCRUD
    {
        
        public DictionaryAccess(Requestor requestor) : base(requestor, "T_REF_Dictionary") 
        {
        }
        public async Task<List<DictionaryLanguage>> GetManyById(int id)
        {
            return await base.GetManyById<DictionaryLanguage>(id, "LanguageId", new List<string> { "*" });
        }
    }
}
