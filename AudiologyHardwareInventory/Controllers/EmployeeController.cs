
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AudiologyHardwareInventory.Models;
using AudiologyHardwareInventory.Interface;
using System.Net.Http;

namespace AudiologyHardwareInventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ApiControllerAttribute
    {
        private readonly ILogger<TeamController> _logger;
        private readonly ITeam _team;

        //HardwareInventoryContext _hardwareInventoryContext=null;

        public EmployeeController(ILogger<TeamController> logger, ITeam team)
        {
            _logger = logger;
            this._team = team;
        }
       

        [HttpPost]
        //[Route("save/{team}")]
        public bool Post(Team team)
        {

            return true;
        }



    }
}
