using Ghadiful.Application.Abstractions;
using Ghadiful.ViewModel.DataTable;
using Ghadiful.ViewModel.Employees;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Syncfusion.EJ2.Base;

namespace Ghadiful.Web.Controllers
{
    [Authorize]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;
        private readonly ILogger<EmployeeController> _logger;
        private readonly IMemoryCache _memoryCache;
        private const string EmployeeCacheKey = "EMPLOYEE_CACHE";
        private readonly IOrganizationService _orgService;
        private readonly IDesignationService _designationService;
        private readonly IOvertimeLimitService _overtimeLimitService;
        private readonly ILeaveService _leaveService;
        public EmployeeController(IEmployeeService employee, IOrganizationService orgService, IDesignationService designationService, 
            IOvertimeLimitService overtimeLimitService, ILeaveService leaveService, ILogger<EmployeeController> logger, IMemoryCache memoryCache)
        {
            _employeeService = employee;
            _logger = logger;
            _memoryCache = memoryCache;
            _orgService = orgService;
            _designationService = designationService;
            _overtimeLimitService = overtimeLimitService;
            _leaveService = leaveService;
        }
        [HttpGet("employee/index/{id}")]
        [HttpGet("employee/index")]
        public async Task<IActionResult> Index(long id)
        {
            if(id > 0)
            {
                var emp = await _employeeService.Get(id);
                var empTags = await _employeeService.GetTags(id);
                emp.Tags = empTags;

                var org = await _orgService.GetAsync();
                var designation = await _designationService.Get();
                ViewBag.OrgData = org;
                ViewBag.Designation = designation;
                
                return View("Profile", emp);
            }

            List<object> DataRange = new List<object>();
            DataRange.Add(new { Text = "1,000 Rows 11 Columns", Value = "1000" });
            DataRange.Add(new { Text = "10,000 Rows 11 Columns", Value = "10000" });
            DataRange.Add(new { Text = "1,00,000 Rows 11 Columns", Value = "100000" });
            ViewBag.Data = DataRange;
           // var empList = await _employeeService.Get();
            return await Task.Run(() => View());
        }

        [HttpGet("employee/overtime/{id}")]
        public async Task<IActionResult> Overtime(long id)
        {
            var emp = await _employeeService.Get(id);
                
            var overtimeLimitData = await _overtimeLimitService.GetAsync();
            ViewBag.OvertimeLimitData = overtimeLimitData;                
                
            return View("Overtime", emp);
        }
        
           [HttpGet("employee/leave/{id}")]
        public async Task<IActionResult> Leave(long id)
        {
            var emp = await _employeeService.Get(id);
                
            var leaveBalanceData = await _leaveService.GetBalanceAsync(id);
            ViewBag.LeaveBalanceData = leaveBalanceData;                
                
            return View("Leave", emp);
        }
        
        [HttpGet("employee/group/{id}")]
        public async Task<IActionResult> Group(long id)
        {
            var emp = await _employeeService.GetByGroup(id);                
            return View("Index", emp);
        }

        [HttpPost]
        public async Task<JsonResult> DataSource([FromBody] DataManagerRequest dm)
        {
            var EmployeeCacheList = new List<EmployeeViewModel>() { };
            var cacheFound = _memoryCache.TryGetValue(EmployeeCacheKey, out EmployeeCacheList);
            var DataSource = cacheFound ? EmployeeCacheList.AsEnumerable<EmployeeViewModel>() : await _employeeService.Get();
            if(!cacheFound) _memoryCache.Set(EmployeeCacheKey, DataSource.ToList());

            DataOperations operation = new DataOperations(); 
            if (dm.Search != null && dm.Search.Count > 0)
            {
                DataSource = operation.PerformSearching(DataSource, dm.Search);  //Search
            }
            if (dm.Sorted != null && dm.Sorted.Count > 0) //Sorting
            {
                DataSource = operation.PerformSorting(DataSource, dm.Sorted);
            }
            if (dm.Where != null && dm.Where.Count > 0) //Filtering
            {
                DataSource = operation.PerformFiltering(DataSource, dm.Where, dm.Where[0].Operator);
            }
            int count = DataSource.Count();
            if (dm.Skip != 0)
            {
                DataSource = operation.PerformSkip(DataSource, dm.Skip);   //Paging
            }
            if (dm.Take != 0)
            {
                DataSource = operation.PerformTake(DataSource, dm.Take);
            }
            return dm.RequiresCounts ? Json(new { result = DataSource, count = count }) : Json(DataSource);
        }
              
        public async Task<JsonResult> List(DTPostModel model, EmployeeSearchViewModel searchModel)
        {
            try
            {
                var result = await _employeeService.Get();
                return Json(new DTResponseModel { data = result, draw = model.draw, recordsFiltered = result.Count(), recordsTotal = result.Count(), status = true });


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }
         
        public async Task<JsonResult> Search(string query)
        {
            try
            {
                var result = await _employeeService.Search(query);
                return Json(result);


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }    
        
    }
}
