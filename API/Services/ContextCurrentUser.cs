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
            this.Updated = user.Updated;
        }
        public ContextCurrentUser(ClaimsPrincipal user)
        {
            UserId = int.Parse(user.FindFirst("UserId").Value);

            string roleName = user.FindFirst("Role").Value;
            RoleId = (int)Enum.Parse(typeof(enumRole), roleName);
            LanguageId = int.Parse(user.FindFirst("LanguageId").Value);
            UserName = user.FindFirst("UserName").Value;
            Email = user.FindFirst("Email").Value;
            Password = user.FindFirst("Password").Value;
            Token = user.FindFirst("Token").Value;
        }
        public void UpdateCurrentUser(User user)
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
            this.Updated = user.Updated;
        }
    }
}
