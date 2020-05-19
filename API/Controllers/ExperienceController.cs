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
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly IEmailManager _email;
        private readonly IExperienceManager _experienceManager;

        public ExperienceController(IEmailManager emailManager,IExperienceManager experienceManager) {
            _email = emailManager;
            _experienceManager = experienceManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<List<Experience>> GetAll()
        {
            try
            {
                return await _experienceManager.GetAllExperiences();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
    }
}