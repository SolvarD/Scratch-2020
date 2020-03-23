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
        public UserController(IUserManager userManager, ContextCurrentUser currentUser ,IHttpContextAccessor httpContext)
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

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<User> Login(User user)
        {
            User loggedUser = await _userManager.Login(user.Email, user.Password);
            _currentUser.UpdateCurrentUser(loggedUser);          
            return loggedUser;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login(string returnUrl)
        {
            var user = await _userManager.Login();
            //var claims = user.GetClaims();
            //_httpContext.HttpContext.Session.SetString("TEST", "OWARIDA !!");
            //var claimsIdentity = new ClaimsIdentity(claims, "GlobalDevApp");
            //await HttpContext.SignInAsync("GlobalDevApp", new ClaimsPrincipal(claimsIdentity), new AuthenticationProperties { IsPersistent = true});
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
    }
}