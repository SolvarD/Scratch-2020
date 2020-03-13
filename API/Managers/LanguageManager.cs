using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface ILanguageManager {
        Task<List<Language>> GetAllLanguages();
    }
    public class LanguageManager : ILanguageManager
    {
        private readonly LanguageAccess _languageAccess;

        public LanguageManager(LanguageAccess languageAccess) {
            _languageAccess = languageAccess;
        }

        public Task<List<Language>> GetAllLanguages()
        {
            return _languageAccess.GetAll();
        }
    }
}
