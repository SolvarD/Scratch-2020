using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class ContactMessageAccess : DALCRUD
    {
        public ContactMessageAccess(Requestor requestor) : base(requestor, "ContactMessages")
        { }
        public async Task<List<ContactMessage>> GetAll()
        {
            return await base.GetAll<ContactMessage>(new List<string> { "*" });
        }

        public async Task<ContactMessage> Insert(ContactMessage item)
        {
            List<string> columns = new List<string> { "FirstName", "LastName", "Email", "Message"};
            return  base.Insert<ContactMessage>(item, columns);
        }
    }
}
