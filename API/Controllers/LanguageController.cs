using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using API.models;
using DataAccess.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LanguageController : CustomControllerBase
    {
        private readonly ILanguageManager _languageManager;
        private readonly IEmailManager _email;
        public LanguageController(ILanguageManager languageManager, IEmailManager email)
        {
            _languageManager = languageManager;
            _email = email;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<ApiResult<List<Language>>>> GetAll()
        {
            return ReturnResponse(() => _languageManager.GetAllLanguages());
        }
    }
}