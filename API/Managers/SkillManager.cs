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
    public interface ISkillManager
    {
        Task<List<SkillCategory>> GetAllSkills();
    }
    public class SkillManager : ISkillManager
    {
        private readonly IEmailManager _email;
        private readonly SkillCategoryAccess _skillCategoryAccess;
        private readonly SkillCategoryDetailAccess _skillCategoryDetailAccess;

        public SkillManager(IEmailManager emailManager, 
            SkillCategoryAccess skillCategoryAccess, 
            SkillCategoryDetailAccess skillCategoryDetailAccess) {
            
            _email = emailManager;
            _skillCategoryAccess = skillCategoryAccess;
            _skillCategoryDetailAccess = skillCategoryDetailAccess;
        }

        public async Task<List<SkillCategory>> GetAllSkills()
        {
            try
            {
                List<SkillCategory> skills = await _skillCategoryAccess.GetAll();
                List<SkillCategoryDetail> skillDetails = await _skillCategoryDetailAccess.GetAll();

                skills.ForEach((item)=> {
                    item.SkillCategoryDetails = skillDetails.Where(g => g.SkillCategoryId == item.SkillCategoryId).ToList();
                });

                return skills;
            }
            catch (Exception e) {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }            
        }
    }
}
