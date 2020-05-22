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
    public class SkillController : ControllerBase
    {
        private readonly IEmailManager _email;
        private readonly ISkillManager _skillManager;

        public SkillController(IEmailManager emailManager,ISkillManager skillManager) {
            _email = emailManager;
            _skillManager = skillManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<List<SkillCategory>> GetAll()
        {
            try
            {
                return await _skillManager.GetAllSkills();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Detail/GetAll")]
        public async Task<List<SkillCategoryDetail>> GetAllDetail()
        {
            try
            {
                return await _skillManager.GetAllSkillsDetails();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
    }
}