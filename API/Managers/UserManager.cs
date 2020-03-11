using DataAccess.CRUD;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IUserManager {
        Task<List<User>> GetAllUsers();
    }
    public class UserManager: IUserManager
    {
        private readonly UserAccess _userAccess;

        public UserManager(UserAccess userAccess) {
            _userAccess = userAccess;
        }

        public Task<List<User>> GetAllUsers()
        {
            return _userAccess.GetAll();
        }
    }
}
