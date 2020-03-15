using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public interface IDictionnaryAccess
    {
        Task<List<DictionaryLanguage>> GetById(int id);
    }
    public class DictionnaryAccess : DALCRUD
    {
        
        public DictionnaryAccess(Requestor requestor) : base(requestor, "T_REF_Dictionnary") 
        {
        }
        public async Task<List<DictionaryLanguage>> GetManyById(int id)
        {
            return await base.GetManyById<DictionaryLanguage>(id, "LanguageId", new List<string> { "*" });
        }
    }
}
