using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class Experience
    {
        public int ExperienceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public List<SkillCategoryDetail> SkillCategoryDetails { get; set; }
    }
}
