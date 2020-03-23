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
        Task<List<DictionaryLanguage>> GetAll();
    }
    public class DictionaryManager : IDictionaryManager
    {
        private readonly DictionaryAccess _dictionaryAccess;

        public DictionaryManager(DictionaryAccess dictionaryAccess)
        {
            _dictionaryAccess = dictionaryAccess;
        }

        public async Task<Dictionary<string, string>> GetById(int id)
        {
            var dictionary = await _dictionaryAccess.GetManyById(id);
            return dictionary.ToDictionary(g => g.Key, g => g.Label);
        }

        public async Task<List<DictionaryLanguage>> GetAll()
        {
            return await _dictionaryAccess.GetAll<DictionaryLanguage>(new List<string> { "*" });
        }
    }
}
