using Ghadiful.ViewModel.Employees;

namespace Ghadiful.ViewModel.Reports
{
    public class CheckInViewModel
    {
        //public int CalendarId { get; set; }
        //public DateTime ADDate { get; set; }
        //public int BSDate { get; set; }
        public int Date { get; set; }
        //public long EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeOffice { get; set; }
        public string EmployeePost { get; set; }
        public int EmployeeLevel { get; set; }
        //public int ShiftId { get; set; }
        public TimeSpan? ShiftStart { get; set; }
        public TimeSpan? ShiftEnd { get; set; }
        public TimeSpan? CheckIn { get; set; }
        public TimeSpan? CheckOut { get; set; }
    }
}
