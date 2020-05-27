using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Data;

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
        public async Task<bool> UnlinkExperienceSkillDetail(int experienceId, int SkillId)
        {
            await base.Execute<bool>("DeleteExperienceSkillDetail", new
            {
                @ExperienceId = experienceId,
                @SkillCategoryDetailId = SkillId
            });
            return true;
        }

        public async Task<bool> UnlinkManyExperienceSkillDetail(List<Experiences_SkillCategoryDetails> skillscategory)
        {
            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("ExperienceId", typeof(Int32));
            dataTable.Columns.Add("SkillCategoryDetailId", typeof(Int32));

            await base.Execute<SkillCategoryDetail>("DeleteMaynExperienceSkillDetail",
               new
               {
                   @skillsExperience = ToDataTable<Experiences_SkillCategoryDetails>(
                       skillscategory.Select(g => new Experiences_SkillCategoryDetails { ExperienceId = g.ExperienceId, SkillCategoryDetailId = g.SkillCategoryDetailId }).ToList()
                       )
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
