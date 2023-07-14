using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.ViewModel.Reports
{
    public class PayrollSummaryViewModel
    {
        public long EmployeeId { get; set; }
        public string Name { get; set; }
        public string EmployeePost { get; set; }
        public int  EmployeeLevel { get; set; }
        public string EmployeeOffice { get; set; }
        public int TotalDays { get; set; }
        public int PresentDays { get; set; }
        public int AbsentDays { get; set;}
        public int DayOffCount { get; set; }
        public int LeaveCount { get; set; }
        public int HolidayCount { get; set; }
    }
}
