using API.Services;
using DataAccess.CRUD;
using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IUserManager
    {
        Task<List<User>> GetAllUsers();
        Task<User> Login(string login, string password);
        Task<User> Login();
    }
    public class UserManager : IUserManager
    {
        private readonly UserAccess _userAccess;
        private readonly IEncryptManager _encryptManager;
        private readonly IConfiguration _config;
        //private readonly IHttpContextAccessor _httpContext;
        public UserManager(UserAccess userAccess, IEncryptManager encryptManager, IConfiguration config/*, IHttpContextAccessor httpContext*/)
        {
            _userAccess = userAccess;
            _encryptManager = encryptManager;
            _config = config;
            //_httpContext = httpContext;
        }

        public Task<List<User>> GetAllUsers()
        {
            return _userAccess.GetAll();
        }
        public async Task<User> Login(string login, string password)
        {
            var user = await _userAccess.GetByEmailPassword(login, _encryptManager.GetMd5Hash(password));
            return declareUser(user);
        }
        public async Task<User> Login()
        {
            User user = new User
            {
                LanguageId = 1,
                RoleId = (int)enumRole.ANONYME,
                LastName = "Doe",
                FirstName = "John",
                Email = "j.doe@GlobalDevApp.com",
                Created = DateTime.Now,
                Token = string.Empty,
                Password = string.Empty
            };

            return declareUser(user);
        }

        private User declareUser(User user)
        {
            if (user == null) { return null; }
            var userClaims = user.GetClaims();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Authentication:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(userClaims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            return user;
        }
    }
}
