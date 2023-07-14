using Ghadiful.Application.Abstractions;
using Ghadiful.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Ghadiful.Web.Controllers
{
    [Authorize]
    public class OrganizationController : Controller
    {
        private readonly IOrganizationService _organization;
        private readonly IEmployeeService _employeeService;
        private readonly ILogger _logger;
        public OrganizationController(IOrganizationService organization, IEmployeeService employeeService, ILogger<OrganizationController> logger)
        {
            _organization = organization;
            _logger = logger;
            _employeeService = employeeService;
        }

        [HttpGet("organization/index/{id}")]
        [HttpGet("organization/index")]
        public async Task<IActionResult> IndexAsync(int id)
        {
            if(id > 0)
            {
                var org = await _organization.GetAsync(id);
                var orgTags = await _organization.GetTags(id);
                org.Tags = orgTags;             
                
                return View("Profile", org);
            }

            return  View(await _organization.GetAsync());
        }
        public async Task<JsonResult> DataSource(int id)
        {
            var emp = await _employeeService.GetByOrganization(id);
            return Json(new { result = emp, count = emp.Count });
        }
        
        [HttpGet("organization/employee/{id}")]        
        public async Task<IActionResult> Employee(int id)
        {           
            var org = await _organization.GetAsync(id);

            var emp = await _employeeService.GetByOrganization(id);
            ViewBag.empData = emp;
            return View("Employee", org);            
        }
    }
}
