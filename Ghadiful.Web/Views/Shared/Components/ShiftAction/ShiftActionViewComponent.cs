using Ghadiful.Application.Abstractions;
using Ghadiful.ViewModel.Shifts;
using Microsoft.AspNetCore.Mvc;

namespace Ghadiful.Web.Views.Shared.Components.AddShift
{
    public class ShiftActionViewComponent : ViewComponent
    {
        private readonly IShiftService _shiftService;

        public ShiftActionViewComponent(IShiftService shiftService)
        {
            _shiftService = shiftService;
        }

        public async Task<IViewComponentResult> InvokeAsync(int? id)
        {
            if (id is null || id == 0)
                return await Task.Run(() => View(new ShiftViewModel()));
            else
            {
                var result = await _shiftService.GetByIdAsync(id ?? 0);
                if (result.Status)
                {
                    return View(result.Shift);
                }
                return View();
            }
        }
    }
}
