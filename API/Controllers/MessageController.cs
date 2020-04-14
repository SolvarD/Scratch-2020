using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
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
    public class MessageController : Controller
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
        public async Task<List<Message>> GetAll()
        {
            try
            {
                return await _messageManager.GetAllMessages();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
    }
}