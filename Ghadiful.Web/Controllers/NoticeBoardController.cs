using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Ghadiful.Web.Controllers
{
    [Authorize]
    public class NoticeBoardController : Controller
    {
        private readonly INoticeBoardService _noticeBoardService;
        private readonly ILogger<EmployeeController> _logger;
        public NoticeBoardController(INoticeBoardService noticeBoardService, ILogger<EmployeeController> logger)
        {
            _noticeBoardService = noticeBoardService;
            _logger = logger;            
        }
         
         public async Task<IActionResult> IndexAsync() => View(await _noticeBoardService.GetAsync());
    }
}
