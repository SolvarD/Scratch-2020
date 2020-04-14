using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TranslateController : Controller
    {
        private readonly IDictionaryManager _dictionaryManager;
        private readonly IEmailManager _email;
        public TranslateController(IDictionaryManager dictionaryManager, IEmailManager email)
        {
            _dictionaryManager = dictionaryManager;
            _email = email;
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<Dictionary<string,string>> GetById(int id)
        {
            try
            {
                return await _dictionaryManager.GetById(id);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<List<DictionaryLanguage>> GetAll()
        {
            try
            {
                return await _dictionaryManager.GetAll();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("GetFilteredAndPagined")]
        public async Task<Tuple<List<DictionaryLanguage>, InfoPagination>> GetFilteredAndPagined(int take, int skip, string filter = "")
        {
            try
            {
                return await _dictionaryManager.GetFilteredAndPagined(take,skip,filter);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
    }
}