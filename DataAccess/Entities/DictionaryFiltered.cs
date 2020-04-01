

namespace DataAccess.Entities
{
    public class DictionaryFiltered: DictionaryLanguage
    {
        public int Take { get; set; }
        public int Skip { get; set; }
        public string Filter { get; set; }
        public int Total { get; set; }
    }
}
