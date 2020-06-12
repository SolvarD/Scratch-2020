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
using API.models;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : CustomControllerBase
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
        public async Task<ActionResult<ApiResult<List<User>>>> GetAll()
        {
            return ReturnResponse(() => _userManager.GetAllUsers());
        }

        [HttpGet]
        [Authorize("ConsultUsers")]
        [Route("GetFilteredAndPagined")]
        public async Task<ActionResult<ApiResult<Tuple<List<User>, InfoPagination>>>> GetFilteredAndPagined(int take, int skip, string filter = "")
        {
            return ReturnResponse(() => _userManager.GetFilteredAndPagined(take, skip, filter));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<ActionResult<ApiResult<User>>> Login(User user)
        {
            User loggedUser = await _userManager.Login(user.Email, user.Password);

            if (loggedUser == null)
            {
                return Unauthorized();
            }

            return ReturnResponse(async () => {
                return loggedUser;
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<ActionResult<ApiResult<User>>> Login(string returnUrl)
        {
            return ReturnResponse(() => _userManager.Login());
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Logout")]
        public async Task<ActionResult<ApiResult<User>>> Logout()
        {
            return ReturnResponse(() => _userManager.Login());
        }

        [HttpPut]
        [Authorize("UpdateUser")]
        [Route("Update")]
        public async Task<ActionResult<ApiResult<User>>> Update(User user)
        {

            return ReturnResponse<User>(async () =>
            {
                _userManager.Update(user);
                _currentUser.UpdateCurrentUser(user);
                return user;
            });
        }

        [HttpPut]
        [Route("Update/Language")]
        public async Task<ActionResult<ApiResult<User>>> UpdateLanguage(User user)
        {
            return ReturnResponse<User>(async () =>
            {
                _currentUser.LanguageId = user.LanguageId;
                await _userManager.UpdateLanguage(_currentUser);
                return _currentUser;
            });
        }

        [HttpDelete]
        [Route("Delete/{userId}")]
        public async Task<ActionResult<ApiResult<bool>>> Delete(int userId)
        {
            return ReturnResponse(() => _userManager.Delete(userId));
        }

        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult<ApiResult<User>>> Create(User user)
        {
            return ReturnResponse(async () => _userManager.Create(user));
        }
    }
}