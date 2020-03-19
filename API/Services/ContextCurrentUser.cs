using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Services
{
    public class ContextCurrentUser : User
    {
        private readonly ClaimsPrincipal _user;
        public ContextCurrentUser()
        {

        }
        public ContextCurrentUser(User user)
        {
            this.Email = user.Email;
            this.FirstName = user.FirstName;
            this.isActive = user.isActive;
            this.LastName = user.LastName;
            this.Password = user.Password;
            this.RoleId = user.RoleId;
            this.Created = user.Created;
            this.LanguageId = user.LanguageId;
            this.Token = user.Token;
            this.UserId = user.UserId;
        }

        public ContextCurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            _user = httpContextAccessor.HttpContext.User;
            //this.Email = user.Email;
            //this.FirstName = user.FirstName;
            //this.isActive = user.isActive;
            //this.LastName = user.LastName;
            //this.Password = user.Password;
            //this.RoleId = user.RoleId;
            //this.Created = user.Created;
            //this.LanguageId = user.LanguageId;
            //this.Token = user.Token;
        }

        public void UpdateCurrentUser(User user) {
            this.Email = user.Email;
            this.FirstName = user.FirstName;
            this.isActive = user.isActive;
            this.LastName = user.LastName;
            this.Password = user.Password;
            this.RoleId = user.RoleId;
            this.Created = user.Created;
            this.LanguageId = user.LanguageId;
            this.Token = user.Token;
            this.UserId = user.UserId;
        }
    }
}
