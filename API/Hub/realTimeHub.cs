using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using API.Services;
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
    public class UserSignalR
    {
        public string UserContextId { get; set; }
    }

    public interface IRealTimeHub {
        public Task SendMessageToAll(Message message);
        public Task SendMessageToCaller(Message message);
        public Task SendMessageToGroup(string group, Message message);
        public Task SendNumberUser(int number);
    }
    public class RealTimeHub: Hub<IRealTimeHub>
    {
        private readonly IMessageManager _messageManager;
        private UserChatService _userChatService;
        public RealTimeHub(IMessageManager messageManager,UserChatService userChatService)
        {
            _messageManager = messageManager;
            _userChatService = userChatService;
        }
        public Task SendMessageToAll(Message message)
        {
            message.MessageTypeId = (int)enumMessageType.Public;
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
            message.MessageTypeId = (int)enumMessageType.Public;
            message.Group = group;
            return Clients.Groups(group).SendMessageToGroup(TypeMessage.NewMesageGroup, message);
        }

        public Task SendNumberUser(string group, int number)
        {
            return Clients.Groups(group).SendNumberUser(number);
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Public");
            _userChatService.usersChat["Public"].Add(new UserSignalR { UserContextId = Context.ConnectionId });
            await SendNumberUser("Public", _userChatService.usersChat["Public"].Count);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Public");

            var userSignalr = _userChatService.usersChat["Public"].Where(g => g.UserContextId == Context.ConnectionId).First();
            _userChatService.usersChat["Public"].Remove(userSignalr);
            await SendNumberUser("Public", _userChatService.usersChat["Public"].Count);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
