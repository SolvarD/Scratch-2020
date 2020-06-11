using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using API.models;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoleController : CustomControllerBase
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
        public async Task<ActionResult<ApiResult<List<Role>>>> GetAll()
        {
            return ReturnResponse(() => _roleManager.GetAllRoles());
        }
    }
}