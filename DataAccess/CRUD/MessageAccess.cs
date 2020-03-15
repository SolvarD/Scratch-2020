using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class MessageAccess : DALCRUD
    {
        public MessageAccess(Requestor requestor) : base(requestor, "Messages")
        { }
        public async Task<List<Message>> GetAll()
        {
            return await base.GetAll<Message>(new List<string> { "*" });
        }

        public async Task<int> Insert(Message item)
        {
            List<string> columns = new List<string> { "MessageTypeId", "UserName", "Text", "Time", "UserId", "ReceiverId"};
            return await base.Insert<Message>(item, columns);
        }
    }
}
