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
    public class LanguageController : Controller
    {
        private readonly ILanguageManager _languageManager;
        private readonly EmailManager _email;
        public LanguageController(ILanguageManager languageManager, EmailManager email)
        {
            _languageManager = languageManager;
            _email = email;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<List<Language>> GetAll()
        {
            try
            {
                return await _languageManager.GetAllLanguages();
            }
            catch (Exception e)
            {
                _email.SendEmail(e.StackTrace);
                return null;
            }

        }
    }
}