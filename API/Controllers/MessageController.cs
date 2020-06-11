using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using API.models;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MessageController : CustomControllerBase
    {
        private readonly IMessageManager _messageManager;
        private readonly IEmailManager _email;
        public MessageController(IMessageManager messageManager, IEmailManager email)
        {
            _messageManager = messageManager;
            _email = email;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<ApiResult<List<Message>>>> GetAll()
        {
            return ReturnResponse(() => _messageManager.GetAllMessages());
        }
    }
}