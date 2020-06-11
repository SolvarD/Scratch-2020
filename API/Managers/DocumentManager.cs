using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IDocumentManager
    {
        Task<List<Document>> GetAll();
        Document Update(Document document);
        Document Create(Document document);

    }
    public class DocumentManager : IDocumentManager
    {
        private readonly DocumentAccess _documentAccess;

        public DocumentManager(DocumentAccess documentAccess)
        {
            _documentAccess = documentAccess;
        }

        public async Task<List<Document>> GetAll()
        {
            return await _documentAccess.GetAll();
        }

        public Document Update(Document document)
        {
            var updatedDocument = _documentAccess.Update<Document>("DocumentId", document.DocumentId, document, new List<string> {
                "Title",
                "Type",
                "Created",
                "DocumentBase64"
            });

            return updatedDocument;
        }
        public Document Create(Document document)
        {
            var createDocument = _documentAccess.Insert<Document>(document,  new List<string> {
                "Title",
                "Type",
                "Created",
                "DocumentBase64"
            });

            return createDocument;
        }
    }
}
