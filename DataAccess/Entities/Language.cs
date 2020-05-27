using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class Language
    {
        public int LanguageId { get; set; }
        public string Label { get; set; }
        public string Code { get; set; }
        public string Format { get; set; }
    }
}
