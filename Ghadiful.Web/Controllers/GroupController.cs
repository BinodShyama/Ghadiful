using Ghadiful.Application.Abstractions;
using Ghadiful.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ghadiful.Web.Controllers
{
    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;
        private readonly ILogger<GroupController> _logger;
        public GroupController(IGroupService groupService, ILogger<GroupController> logger)
        {
            _groupService = groupService;
            _logger = logger;                 
        }
        public async Task<IActionResult> Index()
        {
             var desingation = await _groupService.GetAllGroupAsync();
            return View(desingation);
        }   
    }
}
