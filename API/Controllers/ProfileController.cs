using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileManager _profile;
        private readonly IEmailManager _email;

        public ProfileController(IEmailManager emailManager, IProfileManager profile) {
            _profile = profile;
            _email = emailManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<List<Profile>> GetAll()
        {
            try
            {
                return await _profile.GetAll();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetOwner")]
        public async Task<Profile> GetOwner()
        {
            try
            {
                return await _profile.GetOwner();
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
        [HttpPut]
        [Route("Update")]
        public async Task<Profile> Update(Profile profile)
        {
            try
            {
                return await _profile.Update(profile);
            }
            catch (Exception e)
            {
                _email.SendTrace(e.StackTrace);
                return null;
            }
        }
    }
}