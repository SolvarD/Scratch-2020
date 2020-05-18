using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class SkillCategory
    {
        public int SkillCategoryId { get; set; }
        public int Order { get; set; }
        public string Label { get; set; }
        public List<SkillCategoryDetail> SkillCategoryDetails { get; set; }
    }
}
