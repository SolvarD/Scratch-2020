using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IMessageManager
    {
        Task<List<Message>> GetAllMessages();
        Task<Message> Insert(Message message);
    }
    public class MessageManager : IMessageManager
    {
        private readonly MessageAccess _messageAccess;
        private readonly IEmailManager _email;

        public MessageManager(MessageAccess messageAccess, IEmailManager emailManager) {
            _messageAccess = messageAccess;
            _email = emailManager;
        }

        public Task<List<Message>> GetAllMessages()
        {
            try
            {
                return _messageAccess.GetAll();
            }
            catch (Exception e) {
                _email.SendTrace(e.Message + e.StackTrace);
                return null;
            }            
        }

        public Task<Message> Insert(Message message)
        {
            return _messageAccess.Insert(message);
        }

    }
}
