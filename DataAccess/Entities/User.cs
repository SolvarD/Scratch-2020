using DataAccess.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public enum enumRole
    {
        ADMIN = 1,
        WEBMASTER,
        USER,
        VISITOR,
        ANONYME
    }
    public class User
    {
        public User()
        {

        }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public string RoleName
        {
            get
            {
                return ((enumRole)RoleId).ToString("g");
            }
        }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public bool isActive { get; set; }
        public int LanguageId { get; set; } = 1;

        public List<Claim> GetClaims()
        {
            return new List<Claim>{
                    new Claim("UserId", UserId.ToString()),
                    new Claim("UserName", UserName ?? ($"{FirstName} {LastName}")),
                    new Claim("Email", Email),
                    new Claim("FullName", string.Format("{0} {1}", FirstName, LastName)),
                    new Claim("Role", RoleName),
                    new Claim(ClaimTypes.Role, ((enumRole)RoleId).ToString("g")),
                    new Claim("LanguageId", LanguageId.ToString()),
                    new Claim("Password", Password.ToString()?? string.Empty),
                    new Claim("Token", Token?? string.Empty)
            };
        }
        public List<Software> Softwares { get; set; }
    }
}
