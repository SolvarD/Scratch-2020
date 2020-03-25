using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IRoleManager
    {
        Task<List<Role>> GetAllRoles();
    }
    public class RoleManager : IRoleManager
    {
        private readonly RoleAccess _roleAccess;

        public RoleManager(RoleAccess roleAccess) {
            _roleAccess = roleAccess;
        }

        public Task<List<Role>> GetAllRoles()
        {
            return _roleAccess.GetAll();
        }
    }
}
