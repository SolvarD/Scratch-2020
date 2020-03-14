using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IMessageManager
    {
        Task<List<Message>> GetAllMessages();
        Task<int> InsertMessage(Message message);
    }
    public class MessageManager : IMessageManager
    {
        private readonly MessageAccess _messageAccess;

        public MessageManager(MessageAccess messageAccess) {
            _messageAccess = messageAccess;
        }

        public Task<List<Message>> GetAllMessages()
        {
            return _messageAccess.GetAll();
        }

        public Task<int> InsertMessage(Message message)
        {
            return _messageAccess.Insert(message);
        }

    }
}
