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

        [HttpPut]
        [AllowAnonymous]
        [Route("Update")]
        public async Task<ActionResult<ApiResult<Document>>> Update(Document document)
        {
            return ReturnResponse(async () => _documentManager.Update(document));
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("Create")]
        public async Task<ActionResult<ApiResult<Document>>> Create(Document document)
        {
            return ReturnResponse(async () => _documentManager.Create(document));
        }
    }
}