using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace DataAccess.CRUD
{
    public class ExperienceAccess : DALCRUD
    {
        public ExperienceAccess(Requestor requestor) : base(requestor, "Experiences")
        { }
        public async Task<List<Experience>> GetAll()
        {
            return await base.GetAll<Experience>(new List<string> { "*" });
        }
        public async Task<bool> DeleteExperienceSkillDetail(int experienceId, int SkillId)
        {
            await base.Execute<bool>("DeleteExperienceSkillDetail", new
            {
                @ExperienceId = experienceId,
                @SkillCategoryDetailId = SkillId
            });
            return true;
        }

        public async Task<bool> DeleteAllExperienceSkillDetailByIdExperience(int experienceId)
        {
            await base.Execute<bool>("DeleteAllExperienceSkillDetailByIdExperience", new
            {
                @ExperienceId = experienceId
            });

            return true;
        }
    }
}
