using Ghadiful.Application.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace Ghadiful.Web.Controllers
{
    public class DesignationController : Controller
    {
        private readonly IDesignationService _designationService;
        private readonly ILogger<DesignationController> _logger;

        public DesignationController(IDesignationService designationService, ILogger<DesignationController> logger)
        {
            _designationService =   designationService;
            _logger = logger;            
        }
        public async Task<IActionResult> Index()
        {
            var desingation = await _designationService.Get();
            return View(desingation);
        }
    }
}
