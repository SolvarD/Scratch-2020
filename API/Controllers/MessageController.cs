using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using DataAccess.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : Controller
    {
        private readonly IMessageManager _messageManager;
        public MessageController(IMessageManager messageManager) {
            _messageManager = messageManager;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<List<Message>> GetAll(){
            //return new List<Message> { new Message {MessageTypeId = 1,Text= "hardcoded", Time = DateTime.Now,UserName= "BE"} };
            return await _messageManager.GetAllMessages();
        }
    }
}