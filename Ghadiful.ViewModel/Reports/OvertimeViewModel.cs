using Ghadiful.ViewModel.Employees;

namespace Ghadiful.ViewModel.Reports
{
    public class OvertimeViewModel //: CheckInViewModel
    {
        //public int Id { get; set; }
        //public int OT_Id { get; set; }
        //public int CalendarId { get; set; }

        //public int OvertimeLimit { get; set; }
        //public int ShiftId { get; set; }
        public int Date { get; set; }
        public long EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeOffice { get; set; }
        public string EmployeePost { get; set; }
        public int EmployeeLevel { get; set; }
        ////public int ShiftId { get; set; }
        public TimeSpan? ShiftStart { get; set; }
        public TimeSpan? ShiftEnd { get; set; }
        public TimeSpan? CheckIn { get; set; }
        public TimeSpan? CheckOut { get; set; }

        public string OT_Code { get; set; }
        public decimal Limit_BeforeShift { get; set; }
        public decimal Limit_AfterShift { get; set; }
        public int WorkHour_BeforeShift { get; set; }
        public int WorkHour_AfterShift { get; set; }
        public decimal OT_BeforeShift { get; set; }
        public decimal OT_AfterShift { get; set; }
    }
}
