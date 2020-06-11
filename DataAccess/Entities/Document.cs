using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DataAccess.Entities
{
    public class Document
    {
        public Document() { }
        public Document(int documentId, IFormFile file)
        {
            byte[] bytes;

            using (var fileStream = new MemoryStream())
            {
                DocumentId = documentId;
                file.CopyTo(fileStream);
                bytes = fileStream.ToArray();
                DocumentBase64 = Convert.ToBase64String(bytes);
                Title = file.FileName;
                Type = file.ContentType;
                Created = DateTime.Today;
            }
        }
        public int DocumentId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public string DocumentBase64 { get; set; }
    }
}
