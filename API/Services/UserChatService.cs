using API.HubApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UserChatService
    {
        public Dictionary<string, List<UserSignalR>> usersChat = new Dictionary<string, List<UserSignalR>>();
        public UserChatService() {
            usersChat.Add("Public", new List<UserSignalR>());
        }
    }
}
