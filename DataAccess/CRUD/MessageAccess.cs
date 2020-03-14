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
        private readonly string _table = "Messages";
        public MessageAccess()
        { }
        public async Task<List<Message>> GetAll()
        {
            return await this.GetAll<Message>();
        }

        public async Task<int> Insert(Message item)
        {
            List<string> columns = new List<string> { "MessageTypeId", "UserName", "Text", "Time", "UserId", "ReceiverId"};
            return await base.Insert<Message>(item, _table, columns);
        }
    }
}
