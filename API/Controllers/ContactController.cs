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
    [Route("[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IEmailManager _email;
        public ContactController(IEmailManager email)
        {
            _email = email;
        }

        [HttpPost]
        public IActionResult SendMessage(ContactMessage contact)
        {
            _email.SendEmail(contact);
            return Ok();
        }
    }
}