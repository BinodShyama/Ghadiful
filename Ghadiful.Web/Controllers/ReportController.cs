using Ghadiful.Application.Abstractions;
using Ghadiful.Application.Extensions;
using Ghadiful.ViewModel.Reports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Ghadiful.Web.Controllers
{
    [Authorize]
    public class ReportController : Controller
    {
        private readonly IReportService _reportService;
        private readonly ILogger _logger;
        private readonly IOrganizationService _orgService;
        private readonly IUserService _userService;
        private readonly IEmployeeService _employeeService;
        public ReportController(IReportService reportService, IOrganizationService orgService, IUserService userService, IEmployeeService employeeService, ILogger<ReportController> logger)
        {
            _reportService = reportService;
            _logger = logger;
            _orgService = orgService;
            _userService = userService;
            _employeeService = employeeService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> CheckIn()
        {            
            var calStart = new DateTime(2023,3,15).ToCalendar();
            var calEnd = new DateTime(2023,4,13).ToCalendar();

            int startDate = calStart.Id;
            int endDate = calEnd.Id;             

            ViewBag.StartDate = calStart.Addate.ToString("yyyy-MM-dd");
            ViewBag.EndDate = calEnd.Addate.ToString("yyyy-MM-dd");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.Get(userId);
            var userType = user.Type;
            
            int orgId = 0;
            long empId = 0;
            var employee = await _employeeService.Get(user.EmployeeId.Value);
            if (userType == "admin")
            {
                orgId = employee.LastOrganizationId;
                ViewBag.Org = employee.Organization;
            }
            
            if(userType == "employee")
            {
                empId = employee.Id;
            }

            var data = await _reportService.GetCheckInDataAsync(startDate, endDate, orgId, empId);
            ViewBag.OrgData = await _orgService.GetAsync();
            //ViewBag.EmpData = await _employeeService.Get();
            return View(data);
        }
        public async Task<List<CheckInViewModel>> ApiCheckIn(DateTime startDate, DateTime endDate, int orgId, long empId)
        {
            var data = await _reportService.GetCheckInDataAsync(startDate.ToCalendar().Id, endDate.ToCalendar().Id, orgId, empId);
            return data;
        }
        public async Task<List<OvertimeViewModel>> ApiOvertime(DateTime startDate, DateTime endDate, int orgId, long empId)
        {
            var data = await _reportService.GetOvertimeDataAsync(startDate.ToCalendar().Id, endDate.ToCalendar().Id, orgId, empId);
            return data;
        }
        public async Task<IActionResult> Overtime()
        {           
            var calStart = new DateTime(2023,3,15).ToCalendar();
            var calEnd = new DateTime(2023,4,13).ToCalendar();

            int startDate = calStart.Id;
            int endDate = calEnd.Id;             

            ViewBag.StartDate = calStart.Addate.ToString("yyyy-MM-dd");
            ViewBag.EndDate = calEnd.Addate.ToString("yyyy-MM-dd");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.Get(userId);
            var userType = user.Type;

            int orgId = 0;
            long empId = 0;
            var employee = await _employeeService.Get(user.EmployeeId.Value);
            if (userType == "admin")
            {
                orgId = employee.LastOrganizationId;
                ViewBag.Org = employee.Organization;
            }

            if (userType == "employee")
            {
                empId = employee.Id;
            }

            var data = await _reportService.GetOvertimeDataAsync(startDate, endDate, orgId, empId);
            ViewBag.OrgData = await _orgService.GetAsync();
            return View(data);
        }
        public async Task<IActionResult> Payroll()
        {
            var calStart = new DateTime(2023,3,15).ToCalendar();
            var calEnd = new DateTime(2023,4,13).ToCalendar();

            int startDate = calStart.Id;
            int endDate = calEnd.Id;             

            ViewBag.StartDate = calStart.Addate.ToString("yyyy-MM-dd");
            ViewBag.EndDate = calEnd.Addate.ToString("yyyy-MM-dd");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.Get(userId);
            var userType = user.Type;

            int orgId = 0;
            long empId = 0;
            var employee = await _employeeService.Get(user.EmployeeId.Value);
            if (userType == "admin")
            {
                orgId = employee.LastOrganizationId;
                //ViewBag.Org = employee.Organization;
            }

            if (userType == "employee")
            {
                empId = employee.Id;
            }

            var data = await _reportService.GetPayrollSummaryDataAsync(startDate, endDate, orgId, empId);
            ViewBag.OrgData = await _orgService.GetAsync();
            return View("PayrollSummary",data);
        }
        public IActionResult BiometricLog()
        {
            return View();
        }
    }
}
