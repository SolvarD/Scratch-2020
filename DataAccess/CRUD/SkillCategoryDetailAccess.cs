using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace DataAccess.CRUD
{
    public class SkillCategoryDetailAccess : DALCRUD
    {
        public SkillCategoryDetailAccess(Requestor requestor) : base(requestor, "SkillCategoryDetails")
        { }
        public async Task<List<SkillCategoryDetail>> GetAll()
        {
            return await base.GetAll<SkillCategoryDetail>(new List<string> { "*" });
        }
        public async Task<List<SkillCategoryDetail>> GetSkillCategoryDetailsWithExperiences()
        {
            return await base.Execute<SkillCategoryDetail>("GetSkillCategoryDetailsWithExperiences");
        }

        public async Task<List<SkillCategoryDetail>> GetSkillCategoryDetailsWithExperiencesByExperienceId(int experienceId)
        {
            return await base.Execute<SkillCategoryDetail>("GetSkillCategoryDetailsWithExperiencesByExperienceId", new { @ExperienceId = experienceId });
        }

        public async Task<SkillCategoryDetail> Insert(SkillCategoryDetail item)
        {
            List<string> columns = new List<string> { "SkillCategoryId", "Label" };
            return base.Insert<SkillCategoryDetail>(item, columns);
        }
    }
}
