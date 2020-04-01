using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using API.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DataAccess.Entities;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserManager _userManager;
        private ContextCurrentUser _currentUser;
        private readonly IHttpContextAccessor _httpContext;
        public UserController(IUserManager userManager, ContextCurrentUser currentUser, IHttpContextAccessor httpContext)
        {
            _userManager = userManager;
            _currentUser = currentUser;
            _httpContext = httpContext;
        }

        [HttpGet]
        [Authorize("ConsultUsers")]
        [Route("GetAll")]
        public async Task<List<User>> GetAll()
        {
            return await _userManager.GetAllUsers();
        }

        [HttpGet]
        [Authorize("ConsultUsers")]
        [Route("GetFilteredAndPagined")]
        public async Task<Tuple<List<User>, InfoPagination>> GetFilteredAndPagined(int take, int skip, string filter = "")
        {
            return await _userManager.GetFilteredAndPagined(take, skip, filter);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login(User user)
        {
            User loggedUser = await _userManager.Login(user.Email, user.Password);

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            _currentUser.UpdateCurrentUser(loggedUser);
            return Ok(loggedUser);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login(string returnUrl)
        {
            var user = await _userManager.Login();
            return Ok(user);
        }

        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            var user = await _userManager.Login();
            return Ok(user);
        }

        [HttpPut]
        [Authorize("UpdateUser")]
        [Route("Update")]
        public async Task<User> Update(User user)
        {
            await _userManager.Update(user);
            _currentUser.UpdateCurrentUser(user);
            return user;
        }

        [HttpPut]
        [Route("Update/Language")]
        public async Task<User> UpdateLanguage(User user)
        {
            var current = _httpContext.HttpContext.User.Claims;
            _currentUser.LanguageId = user.LanguageId;
            await _userManager.UpdateLanguage(_currentUser);
            return _currentUser;
        }

        [HttpDelete]
        [Route("Delete/{userId}")]
        public async Task<IActionResult> Delete(int userId)
        {
            await _userManager.Delete(userId);
            return Ok();
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(User user)
        {
            _userManager.Create(user);
            return Ok();
        }
    }
}