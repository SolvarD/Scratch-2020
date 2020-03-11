using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        private readonly ClaimsPrincipal _user;
        public User(IHttpContextAccessor httpContextAccessor) {
        
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
    }
}
