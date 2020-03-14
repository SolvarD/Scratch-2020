using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class UserAccess : DALCRUD
    {
        public UserAccess()
        { }
        public async Task<List<User>> GetAll()
        {
            return await base.Execute<User>("GetAllUsers");
        }
    }
}
