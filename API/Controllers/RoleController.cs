using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoleController : Controller
    {
        private readonly IRoleManager _roleManager;
        private readonly IEmailManager _email;
        public RoleController(IRoleManager roleManager, IEmailManager email)
        {
            _roleManager = roleManager;
            _email = email;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<List<Role>> GetAll()
        {
            try
            {
                return await _roleManager.GetAllRoles();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }

        }
    }
}