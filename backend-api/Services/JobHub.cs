using Microsoft.AspNetCore.SignalR;
namespace backend_api.Services
{
    public class JobHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"SignalR client connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }
    }
}
