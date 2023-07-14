using Ghadiful.Application.Abstractions;
using Ghadiful.ViewModel.Holiday;
using Ghadiful.ViewModel.Syncfusion.Schedular;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ghadiful.Web.Controllers
{
    [Authorize]
    public class HolidayController : Controller
    {
        private readonly IHolidayService _holidayService;
        private readonly IHolidayEventService _holidayEventService;
        private readonly IGroupService _groupService;

        public HolidayController(IHolidayService holidayService, IGroupService groupService, IHolidayEventService holidayEventService)
        {
            _holidayService = holidayService;
            _groupService = groupService;
            _holidayEventService = holidayEventService;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.Holidays = JsonConvert.SerializeObject(await _holidayService.GetAllHolidayAsync());
            ViewBag.Group = JsonConvert.SerializeObject(await _groupService.GetAllGroupAsync());
            ViewBag.Events = JsonConvert.SerializeObject(await _holidayEventService.GetAllEventAsync());
            return await Task.Run(() => View());
        }

        [HttpPost]
        public JsonResult LoadData(Params param)
        {
            var result = _holidayEventService.GetAllEventAsync().Result;
            return Json(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public JsonResult UpdateData(HolidayEventEditViewModel eventData)
        {
            if (string.IsNullOrEmpty(eventData.Subject))
                return Json(BadRequest());
            var result =  _holidayEventService.SaveAsync(eventData).Result;
            if (result)
                return Json(Ok());
            else
            {
                return Json(BadRequest());
            }
        }


    }
}
