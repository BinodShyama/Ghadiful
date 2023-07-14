using Ghadiful.Application.Abstractions;
using Ghadiful.ViewModel.Shifts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.Charts;

namespace Ghadiful.Web.Controllers
{
    [Authorize]
    public class ShiftController : Controller
    {
        private readonly IShiftService _shiftService;
        private readonly IUserService _userService;

        public ShiftController(IUserService userService, IShiftService shiftService)
        {
            _userService = userService;
            _shiftService = shiftService;
        }

        public async Task<IActionResult> Index()
        {
            var model = await _shiftService.GetAsync();
            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return await Task.Run(()=> ViewComponent("ShiftAction"));
        }

        [HttpPost]
        public async Task<IActionResult> Create(ShiftViewModel model)
        {
            return await Task.Run(() => ViewComponent("ShiftAction"));
        }

        public bool IsDuplicateName()
        {
            return true;
        }
        public bool IsDuplicateCode()
        {
            return true;
        }
    }
}
