using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using DataAccess.Entities;
using DataAccess.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.HubApi
{
    public static class TypeMessage
    {
        public const string NewMesage = "NewMesage";
        public const string NewMesageGroup = "NewMesageGroup";
    }
    public interface IRealTimeHub {
        public Task SendMessageToAll(Message message);
        public Task SendMessageToCaller(Message message);
        public Task SendMessageToGroup(string group, Message message);
    }
    public class RealTimeHub: Hub<IRealTimeHub>
    {
        private readonly IMessageManager _messageManager;

        public RealTimeHub(IMessageManager messageManager)
        {
            _messageManager = messageManager;
        }
        private Dictionary<string, User> _usersChat = new Dictionary<string, User>();
        public Task SendMessageToAll(Message message)
        {
            message.MessageTypeId = (int)enumMessageType.PUBLIC;
            message.Group = "Public";
            _messageManager.Insert(message);
            return Clients.All.SendMessageToAll(message);
        }

        public Task SendMessageToCaller(Message message)
        {
            return Clients.Caller.SendMessageToCaller(message);
        }
        public Task SendMessageToGroup(string group, Message message)
        {
            message.MessageTypeId = (int)enumMessageType.PUBLIC;
            message.Group = group;
            return Clients.Groups(group).SendMessageToGroup(TypeMessage.NewMesageGroup, message);
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Public");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Public");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
