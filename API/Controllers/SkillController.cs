using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using API.models;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class SkillController : CustomControllerBase
    {
        private readonly IEmailManager _email;
        private readonly ISkillManager _skillManager;

        public SkillController(IEmailManager emailManager, ISkillManager skillManager)
        {
            _email = emailManager;
            _skillManager = skillManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<ActionResult<ApiResult<List<SkillCategory>>>> GetAll()
        {
            return ReturnResponse(() => _skillManager.GetAllSkills());
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Detail/GetAll")]
        public async Task<ActionResult<ApiResult<List<SkillCategoryDetail>>>> GetAllDetail()
        {
            return ReturnResponse(() => _skillManager.GetAllSkillsDetails());
        }
    }
}