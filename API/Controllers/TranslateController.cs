using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using DataAccess.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TranslateController : Controller
    {
        private readonly IDictionaryManager _dictionnaryManager;
        private readonly EmailManager _email;
        public TranslateController(IDictionaryManager dictionaryManager, EmailManager email)
        {
            _dictionnaryManager = dictionaryManager;
            _email = email;
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<Dictionary<string,string>> GetById(int id)
        {
            try
            {
                return await _dictionnaryManager.GetById(id);
            }
            catch (Exception e)
            {
                _email.SendEmail(e.StackTrace);
                return null;
            }

        }
    }
}