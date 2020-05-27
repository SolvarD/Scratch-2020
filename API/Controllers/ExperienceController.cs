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
        [HttpDelete]
        [Route("Skill/Delete/{ExperienceId}/{SkillId}")]
        public async Task<List<SkillCategoryDetail>> DeleteSkill(int ExperienceId, int SkillId)
        {
            try
            {
                return await _experienceManager.UnlinkSkillExperience(ExperienceId, SkillId);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }

        [HttpPost]
        [Route("Skill/Delete")]
        public async Task<List<SkillCategoryDetail>> DeleteManySkill(List<Experiences_SkillCategoryDetails> skillscategory)
        {
            try
            {
                return await _experienceManager.UnlinkManySkillExperience(skillscategory);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }

        [HttpDelete]
        [Route("Delete/{ExperienceId}")]
        public async Task<bool> Delete(int ExperienceId)
        {
            try
            {
                return await _experienceManager.DeleteExperience(ExperienceId);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return false;
            }
        }

        [HttpPost]
        [Route("Save")]
        public async Task<Experience> Save(Experience experience)
        {
            try
            {
                var savedExperience = await _experienceManager.SaveOrUpadateExperience(experience);

                experience.SkillCategoryDetails.ForEach(item => item.ExperienceId = savedExperience.ExperienceId);

                savedExperience.SkillCategoryDetails = await _skillManager.AddSkillsToExperience(experience.SkillCategoryDetails);
                return savedExperience;
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
    }
}