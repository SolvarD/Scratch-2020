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
        Task<List<SkillCategoryDetail>> GetAllSkillsDetails();
        Task<List<SkillCategoryDetail>> InsertMany(List<SkillCategoryDetail> skills);
        Task<SkillCategoryDetail> Insert(SkillCategoryDetail skill);
        Task<List<SkillCategoryDetail>> AddSkillsToExperience(List<SkillCategoryDetail> skills);
    }
    public class SkillManager : ISkillManager
    {
        private readonly IEmailManager _email;
        private readonly SkillCategoryAccess _skillCategoryAccess;
        private readonly SkillCategoryDetailAccess _skillCategoryDetailAccess;

        public SkillManager(IEmailManager emailManager,
            SkillCategoryAccess skillCategoryAccess,
            SkillCategoryDetailAccess skillCategoryDetailAccess)
        {

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

                skills.ForEach((item) =>
                {
                    item.SkillCategoryDetails = skillDetails.Where(g => g.SkillCategoryId == item.SkillCategoryId).ToList();
                });

                return skills;
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }

        public async Task<List<SkillCategoryDetail>> GetAllSkillsDetails()
        {
            try
            {

                return await _skillCategoryDetailAccess.GetAll();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }

        public async Task<SkillCategoryDetail> Insert(SkillCategoryDetail skill)
        {
            try
            {

                return await _skillCategoryDetailAccess.Insert(skill);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }
        public async Task<List<SkillCategoryDetail>> InsertMany(List<SkillCategoryDetail> skills)
        {
            try
            {

                return await _skillCategoryDetailAccess.InsertMany(skills);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }
        public async Task<List<SkillCategoryDetail>> AddSkillsToExperience(List<SkillCategoryDetail> skills)
        {
            try
            {
                return await _skillCategoryDetailAccess.AddSkillToExperience(skills);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }
        }
    }
}
