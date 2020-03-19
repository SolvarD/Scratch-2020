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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserManager _userManager;
        private readonly ContextCurrentUser _currentUser;
        public UserController(IUserManager userManager, ContextCurrentUser currentUser)
        {
            _userManager = userManager;
            _currentUser = currentUser;
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
            User loggedUser = await _userManager.Login(user.Email, user.Password) ?? _currentUser;
            loggedUser.Token = _currentUser.Token;
            _currentUser.UpdateCurrentUser(loggedUser);          
            return loggedUser;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login(string returnUrl)
        {
            //var claimsIdentity = new ClaimsIdentity(_currentUser.getClaims(), JwtBearerDefaults.AuthenticationScheme);
            //await HttpContext.SignInAsync(JwtBearerDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
            return Ok(_currentUser);
        }

        [HttpPost]
        [Route("Logout")]
        public async void Logout(User user)
        {

            //await HttpContext.SignOutAsync(JwtBearerDefaults.AuthenticationScheme);

        }
    }
}