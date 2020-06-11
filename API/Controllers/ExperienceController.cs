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
    public class ExperienceController : CustomControllerBase
    {
        private readonly IEmailManager _email;
        private readonly IExperienceManager _experienceManager;
        private readonly ISkillManager _skillManager;

        public ExperienceController(IEmailManager emailManager, IExperienceManager experienceManager, ISkillManager skillManager)
        {
            _email = emailManager;
            _experienceManager = experienceManager;
            _skillManager = skillManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<ActionResult<ApiResult<List<Experience>>>> GetAll()
        {
            return ReturnResponse(() => _experienceManager.GetAllExperiences());
        }

        [HttpDelete]
        [Route("Skill/Delete/{ExperienceId}/{SkillId}")]
        public async Task<ActionResult<ApiResult<List<SkillCategoryDetail>>>> DeleteSkill(int ExperienceId, int SkillId)
        {
            return ReturnResponse(() => _experienceManager.UnlinkSkillExperience(ExperienceId, SkillId));
        }

        [HttpPost]
        [Route("Skill/Delete")]
        public async Task<ActionResult<ApiResult<List<SkillCategoryDetail>>>> DeleteManySkill(List<Experiences_SkillCategoryDetails> skillscategory)
        {
            return ReturnResponse(() => _experienceManager.UnlinkManySkillExperience(skillscategory));
        }

        [HttpDelete]
        [Route("Delete/{ExperienceId}")]
        public async Task<ActionResult<ApiResult<bool>>> Delete(int ExperienceId)
        {
            return ReturnResponse(() => _experienceManager.DeleteExperience(ExperienceId));
        }

        [HttpPost]
        [Route("Save")]
        public async Task<ActionResult<ApiResult<Experience>>> Save(Experience experience)
        {
            var savedExperience = await _experienceManager.SaveOrUpadateExperience(experience);
            experience.SkillCategoryDetails.ForEach(item => item.ExperienceId = savedExperience.ExperienceId);
            savedExperience.SkillCategoryDetails = await _skillManager.AddSkillsToExperience(experience.SkillCategoryDetails);

            return ReturnResponse(async () => {
                var savedExperience = await _experienceManager.SaveOrUpadateExperience(experience);
                experience.SkillCategoryDetails.ForEach(item => item.ExperienceId = savedExperience.ExperienceId);
                savedExperience.SkillCategoryDetails = await _skillManager.AddSkillsToExperience(experience.SkillCategoryDetails);
                return savedExperience;
            });
        }
    }
}