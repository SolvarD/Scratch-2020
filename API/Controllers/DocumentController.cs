using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using API.models;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class DocumentController : CustomControllerBase
    {
        private readonly IEmailManager _emailManager;
        private readonly IDocumentManager _documentManager;
        public DocumentController(IEmailManager emailManager, IDocumentManager documentMangager)
        {
            _emailManager = emailManager;
            _documentManager = documentMangager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<ActionResult<ApiResult<List<Document>>>> GetAll()
        {
            return ReturnResponse(() => _documentManager.GetAll());
        }

        [HttpPost]
        [Route("Update")]
        public async Task<ActionResult<ApiResult<Document>>> Update(DocumentForm document)
        {
            return ReturnResponse(async () =>_documentManager.Update(new Document(document.DocumentId, document.Document)));
        }
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult<ApiResult<Document>>> Create(DocumentForm document)
        {
            return ReturnResponse(async () => _documentManager.Create(new Document(document.DocumentId, document.Document)));
        }
    }
}