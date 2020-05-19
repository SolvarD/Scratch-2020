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

                experiences.ForEach((item) => {
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
    }
}
