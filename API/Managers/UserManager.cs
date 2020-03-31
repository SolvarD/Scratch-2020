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
        Task<User> Update(User user);
        User Create(User user);
        Task<bool> Delete(int userId);
        Task<User> UpdateToken(User user);
        Task<User> UpdateLanguage(User user);
    }
    public class UserManager : IUserManager
    {
        private readonly UserAccess _userAccess;
        private readonly IEncryptManager _encryptManager;
        private readonly IConfiguration _config;
        //private readonly IHttpContextAccessor _httpContext;
        public UserManager(UserAccess userAccess, IEncryptManager encryptManager, IConfiguration config)
        {
            _userAccess = userAccess;
            _encryptManager = encryptManager;
            _config = config;
        }

        public Task<List<User>> GetAllUsers()
        {
            return _userAccess.GetAll();
        }
        public async Task<User> Login(string login, string password)
        {
            var user = await _userAccess.GetByEmailPassword(login, _encryptManager.GetMd5Hash(password));
            if (user != null) {
                var userLogged = declareUser(user);
                await UpdateToken(user);
                return userLogged;
            }
            return user;
        }
        public async Task<User> Login()
        {
            DateTime curentdate = DateTime.Now;
            string idUserAnonyme = $"{ curentdate.Hour}{ curentdate.Minute}{ curentdate.Second}{ curentdate.Millisecond}";

            User user = new User
            {
                LanguageId = 1,
                RoleId = (int)enumRole.ANONYME,
                LastName = "Doe",
                FirstName = "John",
                UserName = "anonyme" + idUserAnonyme,
                Email = "j.doe@GlobalDevApp.com",
                Created = DateTime.Now,
                Token = string.Empty,
                Password = string.Empty
            };

            return declareUser(user);
        }

        public async Task<User> UpdateToken(User user)
        {
            var users = await _userAccess.Update(user, new List<string> { "Token" });
            return users.First(); ;
        }

        public async Task<User> Update(User user)
        {
            var users = await _userAccess.Update(user, new List<string> { "Token", "Email", "FirstName", "LastName", "RoleId", "isActive", "LanguageId" });
            return users.First(); ;
        }
        public async Task<User> UpdateLanguage(User user)
        {
            var users = await _userAccess.Update(user, new List<string> { "LanguageId" });
            return users.First(); ;
        }

        public async Task<bool> Delete(int userId) {
            var hasDelete = await _userAccess.DeleteById(userId, "UserId") > 0;
            return hasDelete;
        }

        public User Create(User user) {
            user.Created = DateTime.Now;
            return _userAccess.Insert(user, new List<string> { "Email", "FirstName", "LastName", "RoleId", "isActive", "LanguageId", "Password", "Created", "UserName" });
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
