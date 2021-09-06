
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
    [Route("api/[controller]")]
    [ApiController]
    //[Route("[controller]")]
    public class TeamController : Controller
    {
        private readonly ILogger<TeamController> _logger;
        private readonly ITeam _team;

        //HardwareInventoryContext _hardwareInventoryContext=null;

        public TeamController(ILogger<TeamController> logger,ITeam team)
        {
            _logger = logger;
            this._team = team;
        }
        [HttpGet]
        public IEnumerable<Team> Get()
        {
            var chipSet = _team.DisplayTeamStatus();
            return chipSet;
        }

        //[HttpPost]
        ////[Route("save/{team}")]
        //public ActionResult<Team> Post([FromBody] Team team)
        //{
        //    var data = new Team
        //    { TeamId = 6, TeamName = "IOT Team", Description = "description" };
        //    return data;
        //}

        [HttpPost]
        //[Route("save/{team}")]
        public void Post([FromBody] Team team)
        {
            var teamId= _team.DisplayTeamStatus().Count();
            team.TeamId = teamId + 1;
             _team.InsertNewTeam(team);
            //return new EmptyResult();
        }

        [HttpPost]
        [Route("Update")]
        public void Update([FromBody] Team team)
        {
            //var teamId = _team.DisplayTeamStatus().Count();
            //team.TeamId = teamId + 1;
            _team.UpdateTeam(team);
            //return new EmptyResult();
        }
        
        [HttpPost]
        [Route("Delete")]
        public void Delete([FromBody] Team team)
        {
            _team.DeleteTeam(team);
        }
    }
}
