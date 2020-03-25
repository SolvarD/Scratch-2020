using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class RoleAccess : DALCRUD
    {
        public RoleAccess(Requestor requestor) : base(requestor, "T_REF_Roles") 
        { }
        public async Task<List<Role>> GetAll()
        {
            return await base.GetAll<Role>(new List<string> { "*" });
        }
    }
}
