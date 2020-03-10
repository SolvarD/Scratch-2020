using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.HubApi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RealTimeController : ControllerBase
    {
        private readonly IHubContext<RealTimeHub, IRealTimeHub> _realTime;
        public RealTimeController(IHubContext<RealTimeHub, IRealTimeHub> realTime)
        {
            _realTime = realTime;
        }
        [HttpGet]
        [Route("SendAll")]
        public async Task<IActionResult> SendAll([FromQuery] string value)
        {
            await _realTime.Clients.All.SendMessageToAll(value);
            return Ok();
        }
    }
}
