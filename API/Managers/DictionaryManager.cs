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
        Task<Tuple<List<DictionaryLanguage>, InfoPagination>> GetFilteredAndPagined(int take, int skip, string filter);
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

        public async Task<Tuple<List<DictionaryLanguage>, InfoPagination>> GetFilteredAndPagined(int take, int skip, string filter)
        {
            if(filter == null)
            {
                filter = string.Empty;
            }

            var dictionaryLanguage = await _dictionaryAccess.Execute<DictionaryFiltered>("GetDictionaryPaginedAndFiltered", new { @take = take, @skip = skip, @filter = filter });
            Tuple<List<DictionaryLanguage>, InfoPagination> pagination;

            if (dictionaryLanguage.Any())
            {
                pagination =
                new Tuple<List<DictionaryLanguage>, InfoPagination>(dictionaryLanguage.Select(g => new DictionaryLanguage {
                DictionaryId = g.DictionaryId,
                LanguageId = g.LanguageId,
                Key= g.Key,
                Label = g.Label,
                Created = g.Created
                }).ToList(), new InfoPagination { Take = dictionaryLanguage.First().Take, Skip = dictionaryLanguage.First().Skip, Filter = dictionaryLanguage.First().Filter, Total= dictionaryLanguage.First().Total });
            }
            else
            {
                pagination = 
                    new Tuple<List<DictionaryLanguage>, InfoPagination>(new List<DictionaryLanguage> { new DictionaryLanguage() }, new InfoPagination { Take = 0, Skip = 0, Filter = "", Total = 0 });
            }    

            return pagination;
        }
    }
}
