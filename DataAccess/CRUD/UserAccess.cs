using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class UserAccess : DALCRUD
    {
        public UserAccess(Requestor requestor) : base(requestor, "Users")
        { }
        public async Task<List<User>> GetAll()
        {
            return await base.Execute<User>("GetAllUsers");
        }
        public async Task<User> GetByEmailPassword(string email, string password)
        {
            var users = await base.Execute<User>("GetByEmailPassword", new { @email = email, @password = password });
            return users.FirstOrDefault();
        }

        public async Task<List<User>> Update(User user, List<string> columns)
        {
            if (!columns.Any(g => g == "Updated")) {
                columns.Add("Updated");
                user.Updated = DateTime.Now;
            }
            return await base.Update<User>(user.UserId, "UserId", user, columns);
        }
    }
}
