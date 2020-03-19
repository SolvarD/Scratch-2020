using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entities
{
    public class DictionaryLanguage
    {
        public int DictionnaryId { get; set; }
        public int LanguageId { get; set; }
        public string Key { get; set; }
        public string Label { get; set; }
        public DateTime Created { get; set; }
    }
}
