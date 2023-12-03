using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Inveon.Services.ChatHubAPI.ChatHub
{
    public class ChatHub :Hub
    {
        public async Task sendMessage(string message)
        {
            await Clients.All.SendAsync("ReceivedMessage",message);
        }
    }
}
