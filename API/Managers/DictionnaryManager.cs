using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IDictionaryManager
    {
        Task<Dictionary<string, string>> GetById(int id);
    }
    public class DictionnaryManager : IDictionaryManager
    {
        private readonly DictionnaryAccess _dictionaryAccess;

        public DictionnaryManager(DictionnaryAccess dictionaryAccess) {
            _dictionaryAccess = dictionaryAccess;
        }

        public async Task<Dictionary<string,string>> GetById(int id)
        {
            var dictionnary = await _dictionaryAccess.GetManyById(id);
            return dictionnary.ToDictionary(g=> g.Key, g => g.Label);
        }
    }
}
