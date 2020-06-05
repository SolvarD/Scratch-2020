using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace DataAccess.CRUD
{
    public class DocumentAccess : DALCRUD
    {
        public DocumentAccess(Requestor requestor) : base(requestor, "Documents")
        { }
        public async Task<List<Document>> GetAll()
        {
            List<Document> documents = await base.GetAll<Document>(new List<string> { "*" });
            return documents.OrderBy(g => g.Title).ToList();
        }
        public async Task<Document> Insert(Document item)
        {
            List<string> columns = new List<string> {
                "Title",
                "Type",
                "Created",
                "Content"                
            };
            return base.Insert<Document>(item, columns);
        }
    }
}
