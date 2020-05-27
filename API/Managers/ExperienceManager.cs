using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IExperienceManager
    {
        Task<List<Experience>> GetAllExperiences();
        Task<List<SkillCategoryDetail>> UnlinkSkillExperience(int experienceIdint, int SkillId);
        Task<List<SkillCategoryDetail>> UnlinkManySkillExperience(List<Experiences_SkillCategoryDetails> skillscategory);
        Task<Experience> SaveOrUpadateExperience(Experience experience);
        Task<bool> DeleteExperience(int experienceId);

    }
    public class ExperienceManager : IExperienceManager
    {
        private readonly IEmailManager _email;
        private readonly ExperienceAccess _experienceAccess;
        private readonly SkillCategoryDetailAccess _skillCategoryDetailAccess;

        public ExperienceManager(IEmailManager emailManager,
            ExperienceAccess experienceAccess,
            SkillCategoryDetailAccess skillCategoryDetailAccess)
        {

            _email = emailManager;
            _experienceAccess = experienceAccess;
            _skillCategoryDetailAccess = skillCategoryDetailAccess;
        }

        public async Task<List<Experience>> GetAllExperiences()
        {
            try
            {
                List<Experience> experiences = await _experienceAccess.GetAll();
                List<SkillCategoryDetail> skillsDetails = await _skillCategoryDetailAccess.GetSkillCategoryDetailsWithExperiences();

                experiences.ForEach((item) =>
                {
                    item.SkillCategoryDetails = skillsDetails.Where(g => g.ExperienceId == item.ExperienceId).ToList();
                });

                return experiences;
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }

        public async Task<List<SkillCategoryDetail>> UnlinkSkillExperience(int experienceId, int skillId)
        {
            try
            {
                await _experienceAccess.UnlinkExperienceSkillDetail(experienceId, skillId);
                return await _skillCategoryDetailAccess.GetSkillCategoryDetailsWithExperiencesByExperienceId(experienceId);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }
        public async Task<List<SkillCategoryDetail>> UnlinkManySkillExperience(List<Experiences_SkillCategoryDetails> skillscategory)
        {
            try
            {
                if (skillscategory == null || !skillscategory.Any()) {
                    return new List<SkillCategoryDetail>();
                }

                await _experienceAccess.UnlinkManyExperienceSkillDetail(skillscategory);
                return await _skillCategoryDetailAccess.GetSkillCategoryDetailsWithExperiencesByExperienceId(skillscategory.First().ExperienceId);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }

        public async Task<Experience> SaveOrUpadateExperience(Experience experience)
        {
            if (experience.ExperienceId > 0)
            {
                return _experienceAccess.Update<Experience>("ExperienceId", experience.ExperienceId, experience, new List<string> {
                "[Name]",
                "[Description]",
                "[Start]",
                "[End]" });
            }

            return _experienceAccess.Insert<Experience>(experience, new List<string> {
                "[Name]",
                "[Description]",
                "[Start]",
                "[End]" });
        }
        public async Task<bool> DeleteExperience(int experienceId)
        {
            await _experienceAccess.DeleteAllExperienceSkillDetailByIdExperience(experienceId);
            return await _experienceAccess.DeleteById(experienceId, "ExperienceId") > 0;
        }
    }
}
