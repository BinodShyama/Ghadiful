using Microsoft.AspNetCore.Mvc;

namespace Ghadiful.Web.Controllers
{
    public class SettingsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
