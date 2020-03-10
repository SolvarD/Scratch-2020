using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace API.HubApi
{
    public static class TypeMessage
    {
        public const string NewMesage = "NewMesage";
        public const string NewMesageGroup = "NewMesageGroup";
    }
    public interface IRealTimeHub {
        public Task SendMessageToAll(string user, string message);
        public Task SendMessageToCaller(string message);
        public Task SendMessageToGroup(string group, string message);
    }
    public class RealTimeHub: Hub<IRealTimeHub>
    {
        public Task SendMessageToAll(string user, string message)
        {
            return Clients.All.SendMessageToAll(user, message);
        }

        public Task SendMessageToCaller(string message)
        {
            return Clients.Caller.SendMessageToCaller(message);
        }
        public Task SendMessageToGroup(string group, string message)
        {
            return Clients.Groups(group).SendMessageToGroup(TypeMessage.NewMesageGroup, message);
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
