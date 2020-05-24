using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.SqlServer.Server;
using System.Data;

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

        public async Task<List<SkillCategoryDetail>> InsertMany(List<SkillCategoryDetail> items)
        {
            List<string> columns = new List<string> { "SkillCategoryId", "Label" };
            return base.InsertMany<SkillCategoryDetail>(items, columns);
        }
        public async Task<List<SkillCategoryDetail>> AddSkillToExperience(List<SkillCategoryDetail> items)
        {

            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("ExperienceId", typeof(Int32));
            dataTable.Columns.Add("SkillCategoryDetailId", typeof(Int32));
            //var rows = items.Select(g => new object[2] {  }).ToList();
            //dataTable.Rows.Add(rows);

            //object[] values = new object[2];
            //foreach (T iListItem in iList)
            //{
            //    for (int i = 0; i < values.Length; i++)
            //    {
            //        values[i] = propertyDescriptorCollection[i].GetValue(iListItem);
            //    }
            //    dataTable.Rows.Add(values);
            //}

            return await base.Execute<SkillCategoryDetail>("AddSkillToExperience",
                new
                {
                    @skillsExperience = ToDataTable<Experiences_SkillCategoryDetails>(
                        items.Select(g => new Experiences_SkillCategoryDetails { ExperienceId = g.ExperienceId.Value, SkillCategoryDetailId = g.SkillCategoryDetailId }).ToList()
                        )
                });
        }
    }
}
