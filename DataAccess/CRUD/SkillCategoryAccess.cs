using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace DataAccess.CRUD
{
    public class SkillCategoryAccess : DALCRUD
    {
        public SkillCategoryAccess(Requestor requestor) : base(requestor, "SkillCategories")
        { }
        public async Task<List<SkillCategory>> GetAll()
        {
            List<SkillCategory> skillCategories = await base.GetAll<SkillCategory>(new List<string> { "*" });
            return skillCategories.OrderBy(g => g.Order).ToList();
        }
        public async Task<SkillCategory> Insert(SkillCategory item)
        {
            List<string> columns = new List<string> { "Order", "Label" };
            return base.Insert<SkillCategory>(item, columns);
        }
        //public async Task<List<SkillCategory>> GetAll()
        //{
        //    var sql = @"select * from SkillCategories
        //               select * from SkillCategoryDetails where OWNER_PROFILESIDFK = @id";

        //    using (var multi = connection.QueryMultiple(sql))
        //    {
        //        var profile = multi.Read<Models.PROFILE>().Single();
        //        profile.ProfileImages = multi.Read<Model.PROFILEIMAGES>().ToList();
        //    }

        //    List<SkillCategory> skillCategories = await base.GetAll<SkillCategory>(new List<string> { "*" });
        //    return skillCategories.OrderBy(g => g.Order).ToList();
        //}
    }
}
